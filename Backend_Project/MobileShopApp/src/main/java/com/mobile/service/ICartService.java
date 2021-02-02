package com.mobile.service;

import java.util.List;

import com.mobile.pojos.Cart;

public interface ICartService {
	String deleteFromCart(Long item_id, Long user_id);
	String addArtToCart(Long product_id, Long user_id);
	String clearWholeCart(Long id);
	List<Cart> getAllCartItems(Long user_id);
}
