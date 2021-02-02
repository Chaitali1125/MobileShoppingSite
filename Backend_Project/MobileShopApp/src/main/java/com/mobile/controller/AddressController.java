package com.mobile.controller;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.mobile.pojos.Address;
import com.mobile.service.IAddressService;

@RestController
@CrossOrigin
@RequestMapping("/address")
public class AddressController {
	@Autowired
	private IAddressService addressService;

	public AddressController() {
		System.out.println("In constructor of AddressController().");
	}

	@PostConstruct
	public void init() {
		System.out.println("In init of AddressController().");
	}

	@PutMapping("/updateaddress") // get address ID and then update that address.
	public ResponseEntity<?> updateAddress(@RequestParam Long user_id, @RequestParam Long addr_id,
			@RequestBody Address address) {
		return new ResponseEntity<>(addressService.updateAddress(user_id, addr_id, address), HttpStatus.OK);
	}

	@GetMapping("/addresses/{id}") // API to fetch all addresses of a user by his ID.
	public ResponseEntity<?> getAddresses(@PathVariable Long id) {
		List<Address> addresses = addressService.getAddresses(id);
		if (addresses.isEmpty()) {
			throw new CustomArtCuratorException("No addresses are currently added.", HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(addresses, HttpStatus.OK);
	}

	@PostMapping("/addaddress/{user_id}")
	public ResponseEntity<?> addAddress(@PathVariable Long user_id, @RequestBody Address address) {
		return new ResponseEntity<>(addressService.addAddress(user_id, address), HttpStatus.OK);
	}

	@DeleteMapping("/deleteaddress/{user_id}/{addr_id}")
	public ResponseEntity<?> deleteAddress(@PathVariable Long user_id, @PathVariable Long addr_id) {
		return new ResponseEntity<>(addressService.deleteAddress(user_id, addr_id), HttpStatus.OK);
	}
}