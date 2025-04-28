package com.example.demo.util;

import java.util.Date;
import javax.crypto.SecretKey;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
	private static final String SECRET = "12345678901234567890123456789012"; // 32字以上
	private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
	private static final long EXPIRATION_TIME = 60 * 60 * 1000; // 1天 = 24 * 60 * 60 * 1000
	
	public static String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(KEY)
				.compact();
	}
	
	public static String validateToken(String token) {
		try {
			Claims claims = Jwts.parserBuilder()
					.setSigningKey(KEY)
					.build()
					.parseClaimsJws(token)
					.getBody();
			return claims.getSubject(); // 取出 username
		} catch (Exception e) {
			return null;
		}
	}

}
