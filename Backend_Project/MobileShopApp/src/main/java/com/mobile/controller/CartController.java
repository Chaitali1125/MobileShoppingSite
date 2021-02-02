package com.mobile.controller;

import java.util.List;
import java.util.Optional;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mobile.custom_exceptions.CustomArtCuratorException;
import com.mobile.pojos.Cart;
import com.mobile.pojos.User;
import com.mobile.service.ICartService;
import com.mobile.service.IUserService;

@RestController
@CrossOrigin
@RequestMapping("/cart")
public class CartController {
	@Autowired
	private ICartService cartService;
	@Autowired
	private IUserService userService;

	public CartController() {
		System.out.println("In CartController constructor.");
	}

	@PostConstruct
	public void init() {
		System.out.println("In init of CartController.");
	}

	@GetMapping("/{user_id}")
	public ResponseEntity<?> getUserCart(@PathVariable Long user_id) {
		Optional<User> userOptional = userService.findUserById(user_id);
		if (userOptional.isPresent()) {
			List<Cart> cartItems = userOptional.get().getCartItems();
			if (cartItems.isEmpty()) {
				throw new CustomArtCuratorException("Cart is empty.", HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(cartItems, HttpStatus.OK);
			}
		}
		throw new CustomArtCuratorException("User not found.", HttpStatus.NOT_FOUND);
	}

	@PostMapping("/addtocart")
	public ResponseEntity<?> addArtToCart(@RequestParam Long product_id, @RequestParam Long user_id) {
		System.out.println("In cart controller :"+product_id+" "+user_id);
		return new ResponseEntity<>(cartService.addArtToCart(product_id, user_id), HttpStatus.OK);
	}
  
	@DeleteMapping("/deletefromcart")
	public ResponseEntity<?> deleteItem(@RequestParam Long cart_id, @RequestParam Long user_id) {
		try {
			return new ResponseEntity<>(cartService.deleteFromCart(cart_id, user_id), HttpStatus.OK);
		} catch (RuntimeException e) {
			throw new CustomArtCuratorException("Deletion failed.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/clear/{user_id}")
	public ResponseEntity<?> clearWholeCart(@PathVariable Long user_id) {
		return new ResponseEntity<>(cartService.clearWholeCart(user_id), HttpStatus.OK);
	}
}