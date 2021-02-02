package com.mobile.controller;

import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mobile.service.IOrderService;

@RestController
@CrossOrigin
@RequestMapping("/order")
public class OrderController {
	@Autowired
	private IOrderService orderService;

	public OrderController() {
		System.out.println("In OrderController constructor.");
	}

	@PostConstruct
	public void init() {
		System.out.println("In init of OrderController.");
	}

	@PostMapping("/add/{user_id}")
	public ResponseEntity<?> addToOrder(@PathVariable Long user_id) {
		try {
			return new ResponseEntity<>(orderService.saveOrderHistory(user_id), HttpStatus.OK);
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(orderService.saveOrderHistory(user_id), HttpStatus.OK);
	}
}