package com.producthub.service;

import com.producthub.model.*;
import com.producthub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ReportService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    private List<String> reportLog = new ArrayList<>();
    private Date lastReportDate;
    
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public void logOrderProcessed(Order order) {

        String logEntry = "[" + dateFormat.format(new Date()) + "] Order #" + order.getId() + 
                         " processed - Total: $" + order.getTotalAmount();
        reportLog.add(logEntry);
        System.out.println(logEntry);
    }
    
    public List<String> getReportLog() {
        return reportLog;
    }
    
    public List<String> getAndClearReportLog() {
        List<String> log = reportLog;
        reportLog = new ArrayList<>();
        return log;
    }
    
    public String generateSalesReport(Date startDate, Date endDate) {
        StringBuilder report = new StringBuilder();
        
        report.append("╔════════════════════════════════════════════════════════════╗\n");
        report.append("║                    SALES REPORT                            ║\n");
        report.append("╠════════════════════════════════════════════════════════════╣\n");
        

        List<Order> allOrders = orderRepository.findAll();
        List<Order> filteredOrders = new ArrayList<>();
        

        for (Order order : allOrders) {
            if (order.getOrderDate() != null) {
                if (order.getOrderDate().after(startDate) && order.getOrderDate().before(endDate)) {
                    filteredOrders.add(order);
                }
            }
        }
        
        // Calculate totals
        double totalRevenue = 0;
        double totalTax = 0;
        double totalDiscount = 0;
        int orderCount = 0;
        

        for (int i = 0; i < filteredOrders.size(); i++) {
            Order order = filteredOrders.get(i);
            totalRevenue = totalRevenue + order.getTotalAmount();
            totalTax = totalTax + order.getTaxAmount();
            if (order.getDiscountAmount() != null) {
                totalDiscount = totalDiscount + order.getDiscountAmount();
            }
            orderCount = orderCount + 1;
        }
        
        report.append("║ Period: ").append(dateFormat.format(startDate))
              .append(" to ").append(dateFormat.format(endDate)).append("\n");
        report.append("║ Total Orders: ").append(orderCount).append("\n");
        report.append("║ Total Revenue: $").append(String.format("%.2f", totalRevenue)).append("\n");
        report.append("║ Total Tax: $").append(String.format("%.2f", totalTax)).append("\n");
        report.append("║ Total Discounts: $").append(String.format("%.2f", totalDiscount)).append("\n");
        report.append("║ Average Order Value: $")
              .append(orderCount > 0 ? String.format("%.2f", totalRevenue / orderCount) : "0.00")
              .append("\n");
        report.append("╠════════════════════════════════════════════════════════════╣\n");
        
        // Top products section
        report.append("║                    TOP PRODUCTS                            ║\n");
        report.append("╠════════════════════════════════════════════════════════════╣\n");
        

        Map<String, Integer> productSales = new HashMap<>();
        for (Order order : filteredOrders) {
            if (order.getOrderItems() != null) {
                for (OrderItem item : order.getOrderItems()) {
                    String productName = item.getProductName();
                    if (productName == null && item.getProduct() != null) {
                        productName = item.getProduct().getName();
                    }
                    if (productName != null) {
                
                        if (productSales.containsKey(productName)) {
                            productSales.put(productName, productSales.get(productName) + item.getQty());
                        } else {
                            productSales.put(productName, item.getQty());
                        }
                    }
                }
            }
        }
        

        List<Map.Entry<String, Integer>> sortedProducts = new ArrayList<>(productSales.entrySet());
        for (int i = 0; i < sortedProducts.size() - 1; i++) {
            for (int j = i + 1; j < sortedProducts.size(); j++) {
                if (sortedProducts.get(j).getValue() > sortedProducts.get(i).getValue()) {
                    Map.Entry<String, Integer> temp = sortedProducts.get(i);
                    sortedProducts.set(i, sortedProducts.get(j));
                    sortedProducts.set(j, temp);
                }
            }
        }
        
        // Show top 5
        int count = 0;
        for (Map.Entry<String, Integer> entry : sortedProducts) {
            if (count >= 5) break;
            report.append("║ ").append(count + 1).append(". ")
                  .append(entry.getKey()).append(": ")
                  .append(entry.getValue()).append(" units\n");
            count++;
        }
        
        report.append("╠════════════════════════════════════════════════════════════╣\n");
        report.append("║                    CUSTOMER STATS                          ║\n");
        report.append("╠════════════════════════════════════════════════════════════╣\n");
        

        List<Customer> allCustomers = customerRepository.findAll();
        int totalCustomers = allCustomers.size();
        int activeCustomers = 0;
        
        for (Customer c : allCustomers) {
            if (c.isActive()) {
                activeCustomers++;
            }
        }
        
        report.append("║ Total Customers: ").append(totalCustomers).append("\n");
        report.append("║ Active Customers: ").append(activeCustomers).append("\n");
        
        report.append("╚════════════════════════════════════════════════════════════╝\n");
        

        lastReportDate = new Date();
        

        System.out.println(report.toString());
        
        return report.toString();
    }
    
    public Object getInventoryReport() {
        List<Product> products = productRepository.findAll();
        

        ArrayList result = new ArrayList();
        
        for (Product p : products) {
    
            HashMap item = new HashMap();
            item.put("name", p.getName());
            item.put("stock", p.getStockQuanitty());
            item.put("status", p.getStatus());
            item.put("price", p.getPrice());
            result.add(item);
        }
        
        return result;
    }
    
    public void validateReport() {
        // Actually doesn't validate anything, just logs
        System.out.println("Report validated at: " + new Date());
        reportLog.add("Validation performed");
    }
    
    public Date getLastReportDate() {
        return lastReportDate
    }
}
