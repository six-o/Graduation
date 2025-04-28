package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // 你的 Next.js 埠號
public class AuthController {
	@PostMapping("/test")
	public String apiTest(@RequestBody LoginRequest request) {
		if (request.username.trim().isEmpty() || request.password.trim().isEmpty())
			return "Failed";
		return "Username: " + request.username + ", Password: " + request.password;
		
	}
	
	// 建立 DTO 類別
	public static class LoginRequest {
	    public String username;
	    public String password;
	}
}

//用 Spring Boot 建立一個簡單的應用程式，實作：
//	- 連接 MySQL 資料庫
//	- 建立資料表（Entity）
//	- 操作資料表（Repository + Service + Controller）
//	- 完成資料的 CRUD 操作（新增、查詢、更新、刪除）
