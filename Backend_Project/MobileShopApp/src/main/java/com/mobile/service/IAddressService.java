package com.mobile.service;

import java.util.List;

import com.mobile.pojos.Address;

public interface IAddressService {
	String deleteAddress(Long user_id, Long addr_id);
	List<Address> getAddresses(Long id);
	String updateAddress(Long user_id, Long addr_id, Address address);
	String addAddress(Long id, Address address);
}
