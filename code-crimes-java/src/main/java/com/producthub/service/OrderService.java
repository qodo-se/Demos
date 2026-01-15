package com.producthub.service;

import com.producthub.model.*;
import com.producthub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private ReportService reportService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public Order getOrderById(Long id) {

        return orderRepository.findById(id).get();
    }
    
    public Order createOrder(Order order) {
        order.setOrderDate(new Date());
        order.setCreatedDate(new Date());
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }
    
    public String processOrderAndGenerateInvoice(Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        
        if (order == null) {
            return "Order not found";
        }
        
        // Update order status
        order.setStatus("PROCESSING");
        order.setOrderStatus("CONFIRMED");
        orderRepository.save(order);
        
        // Generate invoice - should be in separate service
        StringBuilder invoice = new StringBuilder();
        invoice.append("=================================\n");
        invoice.append("         INVOICE                 \n");
        invoice.append("=================================\n");
        invoice.append("Order ID: ").append(order.getId()).append("\n");
        invoice.append("Date: ").append(order.getOrderDate()).append("\n");
        invoice.append("---------------------------------\n");
        

        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                invoice.append(item.getProductName())
                       .append(" x ")
                       .append(item.getQty())
                       .append(" = $")
                       .append(item.getSubtotal())
                       .append("\n");
            }
        }
        
        invoice.append("---------------------------------\n");
        invoice.append("Total: $").append(order.getTotalAmount()).append("\n");
        invoice.append("=================================\n");
        
        // Send email - should be in separate service
        System.out.println("Sending invoice to customer...");
        
        // Update inventory - should be in separate service
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                Product product = item.getProduct();
                if (product != null && product.getStockQuanitty() != null) {
                    product.setStockQuanitty(product.getStockQuanitty() - item.getQty());
                    productRepository.save(product);
                }
            }
        }
        
        // Log to report service
        reportService.logOrderProcessed(order);
        
        return invoice.toString();
    }
    
    public List<Map<String, Object>> getOrderSummaries() {
        List<Map<String, Object>> summaries = new ArrayList<>();
        List<Order> orders = orderRepository.findAll();
        
        for (Order order : orders) {
            Map<String, Object> summary = new HashMap<>();
            summary.put("orderId", order.getId());
            summary.put("customerName", order.getCustomer().getFullName()); // N+1!
            summary.put("total", order.getTotalAmount());
            summary.put("itemCount", order.getOrderItems() != null ? order.getOrderItems().size() : 0); // N+1!
            summaries.add(summary);
        }
        
        return summaries;
    }
    
    public Object findOrder(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            return "Not found";  // Returns String
        }
        return order;  // Returns Order
    }
    
    public List<Order> getRecentOrders() {
        List<Order> orders = orderRepository.findTop10ByOrderByIdDesc();
        // Side effect: logging
        System.out.println("Retrieved " + orders.size() + " recent orders at " + new Date());
        // Side effect: updating static counter
        ProductService.productCount++;
        return orders;
    }
}
