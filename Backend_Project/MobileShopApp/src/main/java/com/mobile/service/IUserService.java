package com.mobile.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.mobile.pojos.Address;
import com.mobile.pojos.User;

public interface IUserService {
	String updatePassword(Long id, String oldPassword, String newPassword);
	String changeEmail(Long id, String newEmail);
	String changePhone(Long id, String phone);
	User getUser(int id);
	Optional<User> findByEmailAndPassword(String email, String password);
	void encryptPassword(int id);
	boolean getUserByEmailAndDob(String email, LocalDate dob);
	String getRole(Long id);
	Optional<User> findUserByEmail(String email);
	Optional<User> findUserById(Long user_id);
	String addUser(User user, Address address);
	List<User> findAllUser();
	String changePassword(String email, String newPassword);
	String deleteAccount(Long user_id);
}