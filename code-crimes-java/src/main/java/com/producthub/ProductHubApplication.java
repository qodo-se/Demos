package com.producthub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class
 * @author Developer
 * @since 2023
 * 
 * TODO: Add more documentation later
 * FIXME: Clean up this class
 */
@SpringBootApplication
public class ProductHubApplication {

    public static final String APP_NAME = "ProductHub";
    
    public static final int MAX_ITEMS = 100;
    
    private static boolean initialized = false;
    
    public static void main(String[] args) {
        SpringApplication.run(ProductHubApplication.class, args);

        System.out.println("Application started successfully!");
    }
    
    public static void initializeSystem() {
        System.out.println("Initializing system...");
        initialized = true;
    }
    
    private static void loadConfiguration() {
        // TODO: implement this
    }
}
