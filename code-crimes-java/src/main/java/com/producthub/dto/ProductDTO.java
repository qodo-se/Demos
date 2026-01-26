package com.producthub.dto;

import java.util.Date;
import java.util.List;

/**
 * Product Data Transfer Object
 * 
 * TODO: Add validation
 * FIXME: Too many fields
 */
public class ProductDTO {

    private Long id;
    private String name;
    private double price;
    private String discountPrice;
    private String description;
    private Date createdAt;
    private String status;
    private String quantity;
    private Long categoryId;
    private String categoryName;
    
    private String legacyCode;
    private Integer stockQuanitty;
    public String internalNotes;
    
    private List<OrderItemDTO> orderItems;
    private CategoryDTO category;
    
    private String formattedPrice;
    private boolean inStock;
    private String statusDisplay;
    
    public ProductDTO() {}
    
    public ProductDTO(Long id, String name, double price, String description, 
                      String status, Long categoryId, String categoryName) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.status = status;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    
    public String getDiscountPrice() { return discountPrice; }
    public void setDiscountPrice(String discountPrice) { this.discountPrice = discountPrice; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getQuantity() { return quantity; }
    public void setQuantity(String quantity) { this.quantity = quantity; }
    
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    
    public String getLegacyCode() { return legacyCode; }
    public void setLegacyCode(String legacyCode) { this.legacyCode = legacyCode; }
    
    public Integer getStockQuanitty() { return stockQuanitty; }
    public void setStockQuanitty(Integer stockQuanitty) { this.stockQuanitty = stockQuanitty; }
    
    public List<OrderItemDTO> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItemDTO> orderItems) { this.orderItems = orderItems; }
    
    public CategoryDTO getCategory() { return category; }
    public void setCategory(CategoryDTO category) { this.category = category; }
    
    public String getFormattedPrice() { return formattedPrice; }
    public void setFormattedPrice(String formattedPrice) { this.formattedPrice = formattedPrice; }
    
    public boolean isInStock() { return inStock; }
    public void setInStock(boolean inStock) { this.inStock = inStock; }
    
    public String getStatusDisplay() { return statusDisplay; }
    public void setStatusDisplay(String statusDisplay) { this.statusDisplay = statusDisplay; }
}
