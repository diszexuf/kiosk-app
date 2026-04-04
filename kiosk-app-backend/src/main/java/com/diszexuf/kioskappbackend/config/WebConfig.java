package com.diszexuf.kioskappbackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/messages")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("POST", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);

        registry.addMapping("/api/v1/messages/current")
                .allowedOrigins("http://localhost:5174")
                .allowedMethods("GET", "OPTIONS")
                .allowedHeaders("*");
    }
}