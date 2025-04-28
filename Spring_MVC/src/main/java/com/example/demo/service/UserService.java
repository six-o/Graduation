package com.example.demo.service;

import java.net.http.HttpHeaders;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public User createUser(User user) {
		if (userRepository.findByUsername(user.getUsername()) != null) {
			throw new RuntimeException("使用者名稱已存在");
		}
		return userRepository.save(user);
	}
	
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	public User getUser(Long id) {
		return userRepository.findById(id).orElse(null);
	}
	
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
	
	
	public Boolean login(String username, String password, HttpServletResponse response, String sessionToken) {
		// 先用 username 查詢使用者
		User user = userRepository.findByUsername(username);
		
		Boolean apple = Boolean.FALSE;
		// 比對密碼（目前是明碼比對）
		if (user == null || !user.getPassword().equals(password)) {
			apple = false;
		}
		if (user.getSessionToken() == null) {
			user.setSessionToken(sessionToken);
	    	userRepository.save(user);
	    	apple = true;
		} else {
			apple = false;
		}
		
		return apple;
	}
}
