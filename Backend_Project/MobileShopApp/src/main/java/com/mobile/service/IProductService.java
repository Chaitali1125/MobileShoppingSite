package com.mobile.service;

import java.util.List;

import com.mobile.pojos.Product;
import com.mobile.pojos.Status;

public interface IProductService {
	List<Product> getProducts(String category, String query);
	List<Product> findAllUnsoldProducts();
	String addProduct(Product product, Long id);
	String deleteProduct(Long id);
	List<Product> findAllByIdStatus(Long id, Status status);
	byte[] getImage(Long id);
}
