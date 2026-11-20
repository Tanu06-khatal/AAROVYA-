package com.super30.medicalbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * MVC CORS configuration for AAROVYA Web clients.
 */
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOriginPatterns(
                                "http://localhost:3000",
                                "http://localhost:5173",
                                "http://127.0.0.1:3000",
                                "http://127.0.0.1:5173"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                        .allowedHeaders(
                                "Authorization",
                                "Content-Type",
                                "X-User-Id",
                                "X-User-Role",
                                "X-User-Email",
                                "X-User-Name",
                                "Accept",
                                "Origin"
                        )
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}
