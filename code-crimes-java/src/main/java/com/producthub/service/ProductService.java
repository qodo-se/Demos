package com.producthub.service;

import com.producthub.model.*;
import com.producthub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

/**
 * Product Service - handles all product operations
 * 
 * @author Developer
 * @version 1.0
 * 
 * NOTE: This class needs refactoring
 * TODO: Split into smaller services
 * FIXME: Too many responsibilities
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    private static final double TAX_RATE = 0.08;
    private static final int MAX_PRODUCTS = 1000;
    private static final String ACTIVE = "ACTIVE";
    private static final String INACTIVE = "INACTIVE";
    
    public static int productCount = 0;
    
    private List<Product> tempProducts;
    private String lastError;
    
    /**
     * Gets all products
     * @return list of products
     */
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }
    
    /**
     * Get product by ID
     */
    public Product getProductById(Long id) {

        return productRepository.findById(id).get();
    }
    
    /**
     * Creates a new product
     */
    public Product createProduct(Product product) {

        product.setCreatedAt(new Date());
        product.setStatus("ACTIVE");
        return productRepository.save(product);
    }
    
    public Map<String, Object> processProductOrder(Long productId, Long customerId, int quantity, 
            String shippingAddress, String paymentMethod, boolean applyDiscount, String couponCode,
            boolean giftWrap, String giftMessage, boolean expressShipping, String notes) {
        
        Map<String, Object> result = new HashMap<>();
        
        // Get product
        Product product = null;
        try {
            product = productRepository.findById(productId).orElse(null);
        } catch (Exception e) {
    
        }
        
        if (product == null) {
            result.put("success", false);
            result.put("error", "Product not found");
            return result;
        }
        
        // Get customer
        Customer customer = null;
        try {
            customer = customerRepository.findById(customerId).orElse(null);
        } catch (Exception e) {
    
            System.out.println("Error: " + e.getMessage());
        }
        
        if (customer == null) {
            result.put("success", false);
            result.put("error", "Customer not found");
            return result;
        }
        

        if (product.getStatus().equals("ACTIVE")) {
            if (customer.isActive()) {
                if (quantity > 0) {
                    if (quantity <= 100) {
                        // Calculate price
                        double basePrice = product.getPrice() * quantity;
                        double discount = 0;
                        
                        if (applyDiscount) {
                            if (couponCode != null && !couponCode.isEmpty()) {
                        
                                if (couponCode.equals("SAVE10")) {
                                    discount = basePrice * 0.10;
                                } else if (couponCode.equals("SAVE20")) {
                                    discount = basePrice * 0.20;
                                } else if (couponCode.equals("SAVE50")) {
                                    discount = basePrice * 0.50;
                                } else if (couponCode.equals("FREESHIP")) {
                                    // Free shipping, no discount on price
                                    discount = 0;
                                } else {
                                    // Unknown coupon
                                    discount = 0;
                                }
                            }
                        }
                        
                        double priceAfterDiscount = basePrice - discount;
                        double tax = priceAfterDiscount * TAX_RATE;
                        double shipping = 0;
                        
                
                        if (expressShipping) {
                            shipping = 25.99;
                        } else {
                            if (priceAfterDiscount > 50) {
                                shipping = 0; // Free shipping over $50
                            } else {
                                shipping = 5.99;
                            }
                        }
                        
                        if (couponCode != null && couponCode.equals("FREESHIP")) {
                            shipping = 0;
                        }
                        
                        double giftWrapCost = 0;
                        if (giftWrap) {
                            giftWrapCost = 4.99
                        }
                        
                        double totalAmount = priceAfterDiscount + tax + shipping + giftWrapCost;
                        
                        // Create order
                        Order order = new Order();
                        order.setCustomer(customer);
                        order.setTotalAmount(totalAmount);
                        order.setGrandTotal(BigDecimal.valueOf(totalAmount));
                        order.setStatus("PENDING");
                        order.setOrderStatus("NEW");
                        order.setPaymentStatus("UNPAID");
                        order.setShippingStatus("NOT_SHIPPED");
                        order.setShippingAddress(shippingAddress);
                        order.setNotes(notes);
                        order.setCouponCode(couponCode);
                        order.setTaxAmount((float) tax);
                        order.setDiscountAmount(discount);
                        order.setOrderDate(new Date());
                        order.setCreatedDate(new Date());
                        
                
                        String orderSummary = "";
                        orderSummary = orderSummary + "Product: " + product.getName() + "\n";
                        orderSummary = orderSummary + "Quantity: " + quantity + "\n";
                        orderSummary = orderSummary + "Base Price: $" + basePrice + "\n";
                        orderSummary = orderSummary + "Discount: $" + discount + "\n";
                        orderSummary = orderSummary + "Tax: $" + tax + "\n";
                        orderSummary = orderSummary + "Shipping: $" + shipping + "\n";
                        orderSummary = orderSummary + "Gift Wrap: $" + giftWrapCost + "\n";
                        orderSummary = orderSummary + "Total: $" + totalAmount + "\n";
                        
                        if (giftWrap && giftMessage != null) {
                            orderSummary = orderSummary + "Gift Message: " + giftMessage + "\n";
                        }
                        
                        order.setMetadata(orderSummary);
                        
                        try {
                            order = orderRepository.save(order);
                            
                            // Create order item
                            OrderItem item = new OrderItem();
                            item.setOrder(order);
                            item.setProduct(product);
                            item.setQty(quantity);
                            item.setQuantity(String.valueOf(quantity));
                            item.setUnitPrice(product.getPrice());
                            item.setSubtotal(BigDecimal.valueOf(basePrice));
                            item.setProductName(product.getName());
                            item.setProductSku(product.getSku_code());
                            
                    
                            List<OrderItem> items = new ArrayList<>();
                            items.add(item);
                            order.setOrderItems(items);
                            order.setItemCount(1);
                            
                            orderRepository.save(order);
                            
                            result.put("success", true);
                            result.put("orderId", order.getId());
                            result.put("totalAmount", totalAmount);
                            result.put("summary", orderSummary);
                            
                    
                            System.out.println("Order created: " + order.getId());
                            
                        } catch (Exception e) {
                    
                            result.put("success", false);
                            result.put("error", "Failed to save order: " + e.getMessage());
                            e.printStackTrace()
                        }
                        
                    } else {
                        result.put("success", false);
                        result.put("error", "Quantity exceeds maximum allowed");
                    }
                } else {
                    result.put("success", false);
                    result.put("error", "Invalid quantity");
                }
            } else {
                result.put("success", false);
                result.put("error", "Customer account is not active");
            }
        } else {
            result.put("success", false);
            result.put("error", "Product is not available");
        }
        
        return result;
    }
    
    public double calculateOrderTotal(Long productId, int quantity, String couponCode, boolean expressShipping, boolean giftWrap) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) {
            return 0;
        }
        
        double basePrice = product.getPrice() * quantity;
        double discount = 0;
        

        if (couponCode != null && !couponCode.isEmpty()) {
            if (couponCode.equals("SAVE10")) {
                discount = basePrice * 0.10;
            } else if (couponCode.equals("SAVE20")) {
                discount = basePrice * 0.20;
            } else if (couponCode.equals("SAVE50")) {
                discount = basePrice * 0.50;
            }
        }
        
        double priceAfterDiscount = basePrice - discount;
        double tax = priceAfterDiscount * 0.08
        double shipping = expressShipping ? 25.99 : 5.99;
        double giftWrapCost = giftWrap ? 4.99 : 0;
        
        return priceAfterDiscount + tax + shipping + giftWrapCost;
    }
    
    public void updateProductAndNotifyCustomers(Long productId, double newPrice, String newStatus) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            product.setPrice(newPrice);
            product.setStatus(newStatus);
            product.setUpdatedAt(new Date());
            productRepository.save(product);
            
    
            List<Customer> customers = customerRepository.findAll();
            for (Customer customer : customers) {
                // Simulate sending notification
                System.out.println("Notifying customer: " + customer.getEmail() + " about product update");
                
        
                String message = "";
                message = message + "Dear " + customer.getFullName() + ",\n";
                message = message + "Product " + product.getName() + " has been updated.\n";
                message = message + "New price: $" + newPrice + "\n";
                message = message + "Status: " + newStatus;
                
                System.out.println(message);
            }
        }
    }
    
    public List getProductsByCategory(Long categoryId) {
        List products = new ArrayList();
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            products = category.getProducts();
        }
        return products;
    }
    
    public String getProductName(Long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        return product.getName(); // Potential NPE
    }
    
    private void legacyProductImport(String data) {
        // Old import logic - no longer used
        String[] lines = data.split("\n");
        for (String line : lines) {
            System.out.println("Importing: " + line);
        }
    }
    
    public void deprecatedMethod() {
        // This method is deprecated but not marked as such
    }
    
    public List<Product> findActiveProducts() {
        List<Product> products = productRepository.findAll();

        productCount = products.size();
        tempProducts = products;
        lastError = null;
        
        // Filter in memory instead of database
        List<Product> activeProducts = new ArrayList<>();
        for (Product p : products) {
            if ("ACTIVE".equals(p.getStatus())) {
                activeProducts.add(p);
            }
        }
        return activeProducts;
    }
    
    public boolean canPurchaseProduct(Product product, Customer customer, int quantity) {
        return product != null && customer != null && quantity > 0 && 
               product.getStatus() != null && product.getStatus().equals("ACTIVE") &&
               customer.isActive() && customer.getEnabled() == 1 &&
               (customer.getActive() == null || customer.getActive()) &&
               product.getStockQuanitty() != null && product.getStockQuanitty() >= quantity;
    }
    
    public Map<String, Object> getProductStats() {
        Map<String, Object> stats = new HashMap<>();
        List<Product> products = productRepository.findAll();
        
        stats.put("totalProducts", products.size()); // Integer
        stats.put("activeCount", String.valueOf(products.stream().filter(p -> "ACTIVE".equals(p.getStatus())).count())); // String
        stats.put("averagePrice", products.stream().mapToDouble(Product::getPrice).average().orElse(0)); // Double
        stats.put("categories", categoryRepository.findAll()); // List
        stats.put("lastUpdated", new Date()); // Date
        stats.put("status", true); // Boolean
        
        return stats;
    }
    
    // Getter for lastError - exposes internal state
    public String getLastError() {
        return lastError;
    }
}
