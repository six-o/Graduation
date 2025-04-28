package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // **只允許 http://localhost:3000**
        config.setAllowedOrigins(List.of("http://localhost:3000"));

        // 允許的 HTTP 方法
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 允許的標頭
        config.setAllowedHeaders(List.of("*"));

        // **允許攜帶 Cookie**
        config.setAllowCredentials(true);

        // 設定所有 API 皆適用
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
