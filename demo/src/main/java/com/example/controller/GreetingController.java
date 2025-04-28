package com.example.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000") // 允許前端請求
@RestController
@RequestMapping("/g")
public class GreetingController {

	@GetMapping("/greeting")
    public Map<String, String> greeting(@RequestParam(name="name", required=false, defaultValue="World") String name) {
        return Map.of("message", "Hello, " + name + "!");
    }
}

// mvn clean package -DskipTests
// java -jar target/demo-0.0.1-SNAPSHOT.jar