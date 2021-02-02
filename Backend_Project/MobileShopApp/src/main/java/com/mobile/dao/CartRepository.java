package com.mobile.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mobile.pojos.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
	void deleteById(Long item_id);
	Optional<Cart> findById(Long item_id);
}