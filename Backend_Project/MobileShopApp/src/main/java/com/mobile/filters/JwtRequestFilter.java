package com.mobile.filters;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mobile.custom_exceptions.CustomArtCuratorException;
import com.mobile.util.JwtUtil;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
	@Autowired
	private UserDetailsService service;
	@Autowired
	private JwtUtil utils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
		try {
			// get the value of Authorization header
			String authHeader = request.getHeader("Authorization");
			String userName = null;
			String jwt = null;
			// chk if auth. header exists & currently there is no auth info in the sec ctx
			if (authHeader != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				// get jwt value
				jwt = authHeader.substring(7);// "Bearer jwt value"
				userName = utils.extractUsername(jwt);
				// extract UserDetails from UserDetailsService
				UserDetails details = service.loadUserByUsername(userName);
				// validate the token
				if (utils.validateToken(jwt, details)) {
					System.out.println("JWT validated");
					// have to set authentication info in sec ctx.
					// 1st create UserNamePasswordAuthenticationToken that imple. Authenticationi/f
					UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
							details.getUsername(), details.getPassword(), details.getAuthorities());
					authToken.setDetails(new WebAuthenticationDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authToken);
				}
			}
			filterChain.doFilter(request, response);
		} catch (Exception e) {
			throw new CustomArtCuratorException("JWT validation failed.", HttpStatus.NOT_FOUND);
		}
	}
}
