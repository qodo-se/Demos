package com.producthub.controller;

import com.producthub.model.Order;
import com.producthub.service.OrderService;
import com.producthub.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private ReportService reportService;


    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable("id") Long orderId) {
        return orderService.getOrderById(orderId);
    }
    

    @GetMapping("/find")
    public Object findOrder(@RequestParam Long id) { 
        return orderService.findOrder(id);
    }
    
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }
    

    @GetMapping("/{id}/process")
    public String processOrder(@PathVariable Long id) {
        return orderService.processOrderAndGenerateInvoice(id);
    }
    

    @GetMapping("/summaries")
    public List<Map<String, Object>> getOrderSummaries() {
        return orderService.getOrderSummaries();
    }
    

    @GetMapping("/recent")
    public List<Order> getRecentOrders() {
        return orderService.getRecentOrders();
    }
    

    @GetMapping("/report")
    public String getSalesReport(
            @RequestParam(required = false) Long startTime,
            @RequestParam(required = false) Long endTime) {
        
        Date startDate = startTime != null ? new Date(startTime) : new Date(0);
        Date endDate = endTime != null ? new Date(endTime) : new Date();
        
        return reportService.generateSalesReport(startDate, endDate);
    }
    

    @PostMapping("/{id}/cancel")
    public void cancelOrder(@PathVariable Long id) {
    
        System.out.println("Cancelling order: " + id);
    }
}
