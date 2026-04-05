package com.diszexuf.kioskappbackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Value("${kiosk.cors.admin-url}")
    private String adminUrl;

    @Value("${kiosk.cors.monitor-url}")
    private String monitorUrl;


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/messages")
                .allowedOrigins(adminUrl)
                .allowedMethods("POST", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);

        registry.addMapping("/api/v1/messages/current")
                .allowedOrigins(monitorUrl)
                .allowedMethods("GET", "OPTIONS")
                .allowedHeaders("*");
    }
}