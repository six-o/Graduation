package com.example.demo.controller;

import java.sql.Date;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.logging.log4j.message.Message;
import org.aspectj.bridge.MessageUtil.IMessageRenderer;
import org.hibernate.query.sqm.FetchClauseType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;
	private UserRepository userRepository;
	public UserController(UserRepository _userRepository, UserService _userService) {
        this.userRepository = _userRepository;
        this.userService = _userService;
    }
	
	@PostMapping
	public User createUser(@RequestBody User user) {
		return userService.createUser(user);
	}
	
	@GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser, HttpServletResponse response) {
//    	User user = userRepository.findByUsername(loginUser.getUsername());
//    	if (user != null && user.getPassword().equals(loginUser.getPassword())) {
//    		return ResponseEntity.ok(user);
//    	} else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("登入失敗");
//        }https://6d02tszs-8080.asse.devtunnels.ms/api/users/login
    	String sessionToken = UUID.randomUUID().toString(); // 每次登入產生新 token
    	Boolean user = userService.login(loginUser.getUsername(), loginUser.getPassword(), response, sessionToken);
//    	return user;
    	if (user) {
    		String token = JwtUtil.generateToken(loginUser.getUsername());
    		
    		// 建立 cookieToken（可加 HttpOnly + Secure）
    		ResponseCookie cookieToken = ResponseCookie.from("token", token)
    				.httpOnly(true)
    				.secure(true)
    				.path("/")
    				.maxAge(Duration.ofMinutes(1))
    				.sameSite("None")
    				.build();
    		
    		// 設定 sessionToken cookie
        	// 建立 cookieSession（可加 HttpOnly + Secure）
    		ResponseCookie cookieSession = ResponseCookie.from("sessionToken", sessionToken)
    				.httpOnly(true)
    				.path("/")
    				.sameSite("Strict")
    				.maxAge(Duration.ofMinutes(1))
    				.build();
    		response.addHeader("Set-Cookie", cookieSession.toString());
    		response.addHeader("Set-Cookie", cookieToken.toString());
    		
    		// 可選：也回傳 username 給前端顯示
            return ResponseEntity.ok().body(Map.of("username", loginUser.getUsername(), "Set-Cookie_Token", cookieToken.toString(), "Set-Cookie_Session", cookieSession.toString()));
    	}
    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("登入失敗");
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentToken(@CookieValue("token") String token, @CookieValue("sessionToken") String sessionToken) {
    	String username = JwtUtil.validateToken(token);
    	if (username == null) {
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("無效的 token");
    	}
    	return ResponseEntity.ok(Map.of("username", username));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response, @RequestBody User loginUser) {
    	User user = userRepository.findByUsername(loginUser.getUsername());
    	// 清空 token cookie，設為過期
    	ResponseCookie cookieToken = ResponseCookie.from("token", "")
    			.httpOnly(true)
    			.secure(true) // 如果你在 HTTPS
    			.path("/")
    			.maxAge(0) // 設為立即過期
    			.sameSite("None") // 如果是跨域也需要這個
    			.build();
    	ResponseCookie cookieSession = ResponseCookie.from("sessionToken", "")
    			.httpOnly(true)
    			.secure(true) // 如果你在 HTTPS
    			.path("/")
    			.maxAge(0) // 設為立即過期
    			.sameSite("Strict") // 如果是跨域也需要這個
    			.build();
    	
    	response.addHeader("Set-Cookie", cookieToken.toString());
    	response.addHeader("Set-Cookie", cookieSession.toString());
    	user.setSessionToken(null);
    	userRepository.save(user);
    	return ResponseEntity.ok("Logged out");
    }

    
  
    @PostMapping("/verify-session")
    public ResponseEntity<?> verify_DoSomthing(@CookieValue("sessionToken") String sessionToken) {
    	try {
    		if (sessionToken == null) {
        		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("缺少 sessionToken 或尚未登入");
        	}
//        	
        	User user = userRepository.findBySessionToken(sessionToken);
        	if (!user.getSessionToken().equals(sessionToken)) {
        		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("此帳號已在其他裝置登入或 session 已失效");
        	}
        	// ✅ 驗證通過，可以執行後續操作
            // 例如：操作資料、回傳個人資訊、處理任務等
        	
        	
        	
    	} catch (Exception e) {
    		
    		System.out.println(e);
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("此帳號已在其他 已失效");
		}
    	return ResponseEntity.ok("驗證成功，這是保護的操作！");
    }
}

//POST /api/users 新增資料
//GET /api/users 查詢全部
//GET /api/users/{id} 查單筆
//DELETE /api/users/{id} 刪除
//POST /api/users/login 登入查尋
