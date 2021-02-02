package com.mobile.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.mobile.custom_exceptions.CustomArtCuratorException;
import com.mobile.dao.OrderRepository;
import com.mobile.dao.ProductRepository;
import com.mobile.dao.UserRepository;
import com.mobile.pojos.Cart;
import com.mobile.pojos.Order;
import com.mobile.pojos.Product;
import com.mobile.pojos.Status;
import com.mobile.pojos.User;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {

	@Autowired
	private OrderRepository orderRepo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private UserRepository userRepo;

	@Override
	public String saveOrderHistory(Long user_id) {
		Optional<User> userOptional = userRepo.findById(user_id);
		if (!userOptional.isPresent()) {
			throw new CustomArtCuratorException("User not found.", HttpStatus.NOT_FOUND);
		}
		User buyer = userOptional.get();
		List<Cart> cartItems = buyer.getCartItems();
		if (cartItems.isEmpty()) {
			throw new CustomArtCuratorException("Your cart is empty.", HttpStatus.NO_CONTENT);
		}
		double totalAmount = 0;
		for (Cart cart : cartItems) {
			totalAmount += cart.getAmount();
		}
		if (buyer.getWallet().getAmount() < totalAmount) {
			throw new CustomArtCuratorException("Insufficient funds. Please add money.", HttpStatus.BAD_REQUEST);
		}
		for (Cart cart : cartItems) {
			Long lastOrderId = orderRepo.getLastOrderId();
			if (lastOrderId == null) {
				lastOrderId = 0L;
			}
			Order order = new Order(++lastOrderId, cart.getAmount(), LocalDateTime.now());
			buyer.addOrder(order);
			Optional<Product> productOptional = productRepo.findById(orderRepo.getProductId(cart.getId()));
			if (!productOptional.isPresent()) {
				throw new CustomArtCuratorException("Product is not found.", HttpStatus.NOT_FOUND);
			}
			productOptional.get().setStatus(Status.SOLD);// Setting status of product as SOLD
			order.setProduct(productOptional.get());
			User seller = userRepo.findByName(cart.getArtist_name());
			// Adding amount in seller wallet.
			seller.getWallet().setAmount(seller.getWallet().getAmount() + cart.getAmount());
			// Deducting amount from buyer wallet.
			buyer.getWallet().setAmount(buyer.getWallet().getAmount() - cart.getAmount());
		}
		buyer.getCartItems().removeAll(buyer.getCartItems());
		return "Order successfully placed.";
	}
}