package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true, nullable = false)
	
	private String username;
	
	private String password;
	
	@Column(name = "session_token")
	private String sessionToken;
	
	public Long getId() {
        return id;
    }
    public void setId(Long _id) {
        this.id = _id;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String _username) {
        this.username = _username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String _password) {
        this.password = _password;
    }
    
    public String getSessionToken() {
        return sessionToken;
    }
    public void setSessionToken(String _sessionToken) {
        this.sessionToken = _sessionToken;
    }
	
}
