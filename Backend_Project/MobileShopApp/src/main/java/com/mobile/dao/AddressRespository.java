package com.mobile.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mobile.pojos.Address;

public interface AddressRespository extends JpaRepository<Address, Long> {

}