package com.producthub.util;

import com.producthub.model.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;

/**
 * Helper utility class
 * Contains various helper methods
 * 
 * NOTE: This class has grown too large
 * TODO: Split into smaller utility classes
 */
public class Helper {

    public static String DEFAULT_STATUS = "ACTIVE";
    public static int DEFAULT_PAGE_SIZE = 10;
    
    private static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    private static SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
    public static final String STATUS_ACTIVE = "ACTIVE";
    public static final String STATUS_INACTIVE = "INACTIVE";
    public static final String STATUS_PENDING = "PENDING";
    public static final String STATUS_DELETED = "DELETED";
    
    public static final int STATUS_CODE_ACTIVE = 1;
    public static final int STATUS_CODE_INACTIVE = 0;
    public static final int STATUS_CODE_PENDING = 2;
    
    public static final String ADMIN_ROLE = "ADMIN";
    public static final String USER_ROLE = "USER";
    public static final String GUEST_ROLE = "GUEST";
    
    private Helper() {
        // Prevent instantiation
    }
    
    public static String formatProductInfo(Product product) {
        if (product == null) {
            return "N/A";
        }
        

        String result = "";
        result = result + "Name: " + product.getName() + "\n";
        result = result + "Price: $" + product.getPrice() + "\n";
        result = result + "Status: " + product.getStatus() + "\n";
        
        if (product.getCategory() != null) {
            result = result + "Category: " + product.getCategory().getName() + "\n";
        }
        
        if (product.getDescription() != null && !product.getDescription().isEmpty()) {
            result = result + "Description: " + product.getDescription() + "\n";
        }
        
        return result;
    }
    
    public static String formatProductForEmail(Product product) {
        if (product == null) {
            return "";
        }
        
        StringBuilder sb = new StringBuilder();
        sb.append("<h2>").append(product.getName()).append("</h2>");
        sb.append("<p>Price: $").append(product.getPrice()).append("</p>");
        sb.append("<p>Status: ").append(product.getStatus()).append("</p>");
        
        if (product.getCategory() != null) {
            sb.append("<p>Category: ").append(product.getCategory().getName()).append("</p>");
        }
        
        return sb.toString();
    }
    
    public static String formatPrice(double price, boolean includeCurrency) {
        if (includeCurrency) {
            return "$" + String.format("%.2f", price);
        } else {
            return String.format("%.2f", price);
        }
    }
    
    public static String formatPrice(double price) {
        return formatPrice(price, true);
    }
    
    public static String formatDate(Date date) {
        if (date == null) {
            return "";
        }
        return dateFormat.format(date);
    }
    
    public static String formatDateTime(Date date) {
        if (date == null) {
            return "";
        }
        return dateTimeFormat.format(date);
    }
    
    public static Date parseDate(String dateStr) {
        try {
            return dateFormat.parse(dateStr);
        } catch (Exception e) {
            return null;
        }
    }
    
    public static boolean validateProduct(Product product) {
        if (product == null) return false;
        if (product.getName() == null || product.getName().isEmpty()) return false;
        if (product.getPrice() < 0) return false;
        if (product.getName().length() > 255) return false;
        

        if (!Pattern.matches("^[a-zA-Z0-9\\s-]+$", product.getName())) {
            return false;
        }
        
        return true;
    }
    
    public static boolean validateCustomer(Customer customer) {
        if (customer == null) return false;
        if (customer.getEmail() == null || customer.getEmail().isEmpty()) return false;
        

        if (!Pattern.matches("^[A-Za-z0-9+_.-]+@(.+)$", customer.getEmail())) {
            return false;
        }
        
        return true;
    }
    
    public static Map<String, Object> calculateOrderTotals(Order order) {
        Map<String, Object> totals = new HashMap<>();
        
        double subtotal = 0;
        int itemCount = 0;
        
        if (order != null && order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                if (item.getSubtotal() != null) {
                    subtotal = subtotal + item.getSubtotal().doubleValue();
                }
                itemCount = itemCount + item.getQty();
            }
        }
        

        double tax = subtotal * 0.08;
        double shipping = subtotal > 50 ? 0 : 5.99;
        double total = subtotal + tax + shipping;
        
        totals.put("subtotal", subtotal);
        totals.put("tax", tax);
        totals.put("shipping", shipping);
        totals.put("total", total);
        totals.put("itemCount", itemCount);
        
        return totals;
    }
    
    public static void normalizeCustomerData(Customer customer) {
        if (customer == null) return;
        

        if (customer.getEmail() != null) {
            customer.setEmail(customer.getEmail().toLowerCase().trim());
        }
        
        if (customer.getFirstName() != null) {
            String firstName = customer.getFirstName().trim();
            firstName = firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase();
            customer.setFirstName(firstName);
        }
        
        if (customer.getLastName() != null) {
            String lastName = customer.getLastName().trim();
            lastName = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
            customer.setLastName(lastName);
        }
    }
    
    public static boolean safeEquals(String s1, String s2) {
        if (s1 == null && s2 == null) return true;
        if (s1 == null || s2 == null) return false;
        return s1.equals(s2);
    }
    
    public static String getOrDefault(String value, String defaultValue) {
        if (value == null || value.isEmpty()) {
            return defaultValue;
        }
        return value;
    }
    
    public static List<Product> filterActiveProducts(List<Product> products) {
        List<Product> active = new ArrayList<>();
        for (Product p : products) {
            if (STATUS_ACTIVE.equals(p.getStatus())) {
                active.add(p);
            }
        }
        return active;
    }
    
    public static List<Customer> filterActiveCustomers(List<Customer> customers) {
        List<Customer> active = new ArrayList<>();
        for (Customer c : customers) {
            if (c.isActive()) {
                active.add(c);
            }
        }
        return active;
    }
    
    public static void waitForProcessing() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
    
        }
    }
    
    public static String generateId() {
        return UUID.randomUUID().toString();
    }
    
    private static void logDebug(String message) {
        System.out.println("[DEBUG] " + message);
    }
}
