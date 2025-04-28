package com.example.demo.controller;

import java.awt.geom.AffineTransform;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.controller.AuthController.LoginRequest;

import io.jsonwebtoken.io.IOException;
import reactor.core.publisher.Mono;



@RestController
@RequestMapping("/api/images")
public class ImageController {
	
	private WebClient webClient = null;

	public ImageController(WebClient.Builder builder) {
		this.webClient = builder
				.baseUrl("http://localhost:8000") // FastAPI 伺服器地址
				.build();
	}
	@PostMapping("/upload")
    public Mono<String> uploadAndForward(@RequestParam("file") MultipartFile file) throws IOException {
		try {
	        // 將 MultipartFile 轉成 ByteArrayResource，並覆寫 getFilename()
	        ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
	            @Override
	            public String getFilename() {
	                return file.getOriginalFilename(); // 必須實作，否則出錯
	            }
	        };
	     // 3. 回傳給前端
//	        return ResponseEntity.ok()
//	                .contentLength(data.length)
//	                .contentType(MediaType.parseMediaType(file.getContentType()))
//	                .body(resource);
	        return webClient.post()
	                .uri("/enhance") // FastAPI 端點
	                .contentType(MediaType.MULTIPART_FORM_DATA)
	                .body(BodyInserters.fromMultipartData("image", resource))
	                .retrieve()
	                .bodyToMono(String.class);

	    } catch (IOException e) {
	        // 處理發生錯誤的情況
	        return Mono.error(new RuntimeException("檔案讀取失敗", e));
	    } catch (java.io.IOException e) {
	    	return Mono.error(new RuntimeException("檔案讀取失敗", e));
		}
    }
	
	
	@PostMapping("/load")
	public ResponseEntity<Map<String, Object>> loadImage(@RequestParam("file") MultipartFile file) {
        try {
            String filename = file.getOriginalFilename();
            long size = file.getSize();
            
         // ✅ 轉換尺寸：Bytes ➜ KB / MB
            String readableSize = formatFileSize(size);

            // ✅ 這邊可以加你自己的影像處理邏輯
            System.out.println("收到圖片：" + filename + " (" + readableSize + ")");

            Map<String, Object> result = new HashMap<>();
            result.put("filename", filename);
            result.put("size", size);
            result.put("status", "success");

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
	private String formatFileSize(long bytes) {
	    double sizeInKB = bytes / 1024.0;
	    if (sizeInKB >= 1024) {
	        return String.format("%.2f MB", sizeInKB / 1024.0);
	    } else {
	        return String.format("%.2f KB", sizeInKB);
	    }
	}
	
	@PostMapping("/ana")
	public ResponseEntity<byte[]> analyzeAndEnhanceImage(@RequestParam("file") MultipartFile file) {
		try {
			// 原始檔案資訊
			String filename = file.getOriginalFilename();
            long size = file.getSize();
            System.out.println("收到圖片：" + filename + " (" + formatFileSize(size) + ")");
            
            // =======================
            // ✅ 呼叫 FastAPI 的 /enhance
            // =======================
            String fastapiUrl = "http://127.0.0.1:8000/enhance"; // 改成你的 FastAPI host
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            
            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
            	@Override
            	public String getFilename() {
            		return file.getOriginalFilename(); // 必需指定
            	}
            };
            HttpEntity<ByteArrayResource> fileEntity = new HttpEntity<>(resource, headers);
            LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", fileEntity); // 必須是 "file"，對應 FastAPI 的參數名
            
            HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    fastapiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    byte[].class
            );
            System.out.println("✅ 呼叫成功，回傳長度：" + response.getBody().length);
            // =======================
            // ✅ 回傳圖片給前端
            // =======================
            
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.IMAGE_JPEG);
            responseHeaders.setContentLength(response.getBody().length);
            responseHeaders.setContentDisposition(ContentDisposition.builder("inline")
                    .filename("enhanced.jpg")
                    .build());

            return new ResponseEntity<>(response.getBody(), responseHeaders, HttpStatus.OK);
            
		} catch (Exception e) {
			e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(("Error: " + e.getMessage()).getBytes());
		}
	}
}
