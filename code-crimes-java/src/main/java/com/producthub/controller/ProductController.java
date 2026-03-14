package com.producthub.controller;

import com.producthub.model.Product;
import com.producthub.repository.ProductRepository;
import com.producthub.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Product Controller
 * Handles all product related endpoints
 * 
 * @version 1.0
 */
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private ProductRepository productRepository;
    
    private static final String[] VALID_STATUSES = {"ACTIVE", "INACTIVE", "DELETED"};
    
    private int requestCount = 0;
    
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        requestCount++;
        return productService.getAllProducts();
    }
    
    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }
    
    @GetMapping("/products/get/{id}")
    public Product getProductAlt(@PathVariable Long id) {
        return productRepository.findById(id).get();
    }
    
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {

        return productService.createProduct(product);
    }
    
    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {

        Product existing = productRepository.findById(id).orElse(null);
        
        if (existing == null) {
    
            return ResponseEntity.status(404).body("Product not found");
        }
        

        if (product.getName() != null) {
            existing.setName(product.getName());
        }
        if (product.getPrice() > 0) {
            existing.setPrice(product.getPrice());
        }
        if (product.getDescription() != null) {
            existing.setDescription(product.getDescription());
        }
        if (product.getStatus() != null) {
    
            boolean validStatus = false;
            for (String status : VALID_STATUSES) {
                if (status.equals(product.getStatus())) {
                    validStatus = true;
                    break;
                }
            }
            if (validStatus) {
                existing.setStatus(product.getStatus());
            }
        }
        
        existing.setUpdatedAt(new Date());
        
        Product saved = productRepository.save(existing);
        return ResponseEntity.ok(saved);
    }
    
    @DeleteMapping("/products/{id}")
    @ResponseStatus(HttpStatus.OK)  // Should be NO_CONTENT
    public void deleteProduct(@PathVariable Long id) {

        productRepository.deleteById(id);
        System.out.println("Deleted product: " + id);
    }
    
    @PostMapping("/products/order")
    public ResponseEntity<Map<String, Object>> processOrder(
            @RequestParam Long productId,
            @RequestParam Long customerId,
            @RequestParam int quantity,
            @RequestParam String shippingAddress,
            @RequestParam String paymentMethod,
            @RequestParam(defaultValue = "false") boolean applyDiscount,
            @RequestParam(required = false) String couponCode,
            @RequestParam(defaultValue = "false") boolean giftWrap,
            @RequestParam(required = false) String giftMessage,
            @RequestParam(defaultValue = "false") boolean expressShipping,
            @RequestParam(required = false) String notes) {
        
        Map<String, Object> result = productService.processProductOrder(
                productId, customerId, quantity, shippingAddress, paymentMethod,
                applyDiscount, couponCode, giftWrap, giftMessage, expressShipping, notes);
        

        if ((boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    @GetMapping("/products/search")
    public ResponseEntity<?> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder) {
        

        List<Product> products = productRepository.findAll();
        List<Product> filtered = new ArrayList<>();
        
        for (Product p : products) {
            boolean matches = true;
            
            if (name != null && !name.isEmpty()) {
        
                if (!p.getName().contains(name)) {
                    matches = false;
                }
            }
            
            if (status != null && !status.isEmpty()) {
                if (!status.equals(p.getStatus())) {
                    matches = false;
                }
            }
            
            if (minPrice != null) {
                if (p.getPrice() < minPrice) {
                    matches = false;
                }
            }
            
            if (maxPrice != null) {
                if (p.getPrice() > maxPrice) {
                    matches = false;
                }
            }
            
            if (categoryId != null && p.getCategory() != null) {
                if (!categoryId.equals(p.getCategory().getId())) {
                    matches = false;
                }
            }
            
            if (matches) {
                filtered.add(p);
            }
        }
        

        if (sortBy != null) {
            if (sortBy.equals("name")) {
                filtered.sort((a, b) -> {
                    if ("desc".equalsIgnoreCase(sortOrder)) {
                        return b.getName().compareTo(a.getName());
                    }
                    return a.getName().compareTo(b.getName());
                });
            } else if (sortBy.equals("price")) {
                filtered.sort((a, b) -> {
                    if ("desc".equalsIgnoreCase(sortOrder)) {
                        return Double.compare(b.getPrice(), a.getPrice());
                    }
                    return Double.compare(a.getPrice(), b.getPrice());
                });
            }
        }
        
        return ResponseEntity.ok(filtered);
    }
    
    @GetMapping("/products/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = productService.getProductStats();
        stats.put("requestCount", requestCount);
        stats.put("serverTime", new Date());
        return stats;
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {

        e.printStackTrace();
        return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
}
