package com.mobile.controller;

import java.time.LocalDate;
import java.util.Optional;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mobile.custom_exceptions.CustomArtCuratorException;
import com.mobile.dto.AuthenticationRequest;
import com.mobile.dto.AuthenticationResponse;
import com.mobile.dto.SignupDTO;
import com.mobile.pojos.Address;
import com.mobile.pojos.User;
import com.mobile.service.IUserService;
import com.mobile.util.JwtUtil;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	@Autowired
	private AuthenticationManager mgr;
	@Autowired
	private UserDetailsService service;
	@Autowired
	private JwtUtil utils;
	@Autowired
	private IUserService userService;

	public UserController() {
		System.out.println("In UserController constructor.");
	}

	@PostConstruct
	public void init() {
		System.out.println("In init of UserController.");
	}

	@PostMapping("/login")
	public ResponseEntity<?> createJwtToken(@RequestBody AuthenticationRequest req) {
		try {
			System.out.println(req.getUserName() + " " + req.getPassword());
			mgr.authenticate(new UsernamePasswordAuthenticationToken(req.getUserName(), req.getPassword()));
		} catch (BadCredentialsException e) {
			throw new CustomArtCuratorException("Invalid Email or password", HttpStatus.NOT_FOUND);
		}
		UserDetails details = service.loadUserByUsername(req.getUserName());
		return ResponseEntity.ok(new AuthenticationResponse(utils.generateToken(details)));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> addUserAccount(@RequestBody @Valid SignupDTO dto) {
		if (dto == null) {
			throw new CustomArtCuratorException("Signup form submition failed", HttpStatus.BAD_REQUEST);
		}
		if (userService.findUserByEmail(dto.getEmail()).isPresent()) {
			throw new CustomArtCuratorException("User email already present", HttpStatus.BAD_REQUEST);
		}
		User user = new User(dto.getName(), dto.getEmail(), dto.getPassword(), dto.getPhone(), dto.getDob(),
				dto.getRole());
		Address address = new Address(dto.getApartment(), dto.getStreet(), dto.getCity(), dto.getState(),
				dto.getCountry(), dto.getPin());
		return new ResponseEntity<>(userService.addUser(user, address), HttpStatus.CREATED);
	}

	@GetMapping("/forgotpassword") // authentication check, if email matches dob then send ok and take new
	// Password.
	public ResponseEntity<?> forgotPassword(@RequestParam String email,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dob) {
		if (userService.getUserByEmailAndDob(email, dob)) {
			return ResponseEntity.ok(true);
		}
		throw new CustomArtCuratorException("User not found.", HttpStatus.OK);
	}

	@PutMapping("/changepassword")
	public ResponseEntity<?> changePassword(String email, String newPassword) {
		return new ResponseEntity<>(userService.changePassword(email, newPassword), HttpStatus.OK);
	}

	@PutMapping("/updatepassword") // After log in my account page.
	public ResponseEntity<?> updatePassword(@RequestParam Long id, @RequestParam String oldPassword,
			@RequestParam String newPassword) {
		return new ResponseEntity<>(userService.updatePassword(id, oldPassword, newPassword), HttpStatus.OK);
	}

	@PutMapping("/changeemail")
	public ResponseEntity<?> changeEmail(@RequestParam Long id, @RequestParam String newEmail) {
		return new ResponseEntity<>(userService.changeEmail(id, newEmail), HttpStatus.OK);
	}

	@PutMapping("/changephone")
	public ResponseEntity<?> changePhone(@RequestParam Long id, @RequestParam String phone) {
		return new ResponseEntity<>(userService.changePhone(id, phone), HttpStatus.OK);
	} 

	@GetMapping("/{id}")
	public ResponseEntity<?> getUser(@PathVariable Long id) {
		Optional<User> userOptional = userService.findUserById(id);
		if (userOptional.isPresent()) {
			return ResponseEntity.ok(userOptional.get());
		} else {
			throw new CustomArtCuratorException("User not found.", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/role/{user_id}")
	public ResponseEntity<?> getRole(@PathVariable Long user_id) {
		return ResponseEntity.ok(userService.getRole(user_id));
	}

	@GetMapping("/getuserfromtoken")
	public ResponseEntity<?> getUserFromToken(HttpServletRequest request) {
		UserDetails userDetails = service
				.loadUserByUsername(utils.extractUsername(request.getHeader("Authorization").substring(7)));
		Optional<User> userOptional = userService.findUserByEmail(userDetails.getUsername());
		if (userOptional.isPresent()) {
			return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
		}
		throw new CustomArtCuratorException("User not found.", HttpStatus.NOT_FOUND);
	}

	@GetMapping("/encrypt/{id}")
	public String encryptIt(@PathVariable int id) {
		userService.encryptPassword(id);
		return "Encrypted.";
	}

	@DeleteMapping("/deleteaccount/{user_id}")
	public ResponseEntity<?> deleteAccount(@PathVariable Long user_id) {
		try {
			return ResponseEntity.ok(userService.deleteAccount(user_id));
		} catch (RuntimeException e) {
			throw new CustomArtCuratorException("Deletion failed.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}