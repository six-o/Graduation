package com.example.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:3000") // 允許前端請求
@RestController
@RequestMapping("/api")
public class DataController {


	@GetMapping("/sendData")
	public Map<String, String> receiveData(@RequestParam String name,@RequestParam String age) {
        
        System.out.println("接收到資料: name=" + name + ", age=" + age);
        return Map.of("status", "成功", "name", name, "age", age);
	}
}

// mvn clean package -DskipTests
// java -jar target/demo-0.0.1-SNAPSHOT.jar