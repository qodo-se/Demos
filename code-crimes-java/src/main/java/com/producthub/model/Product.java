package com.producthub.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import java.math.BigDecimal;

/**
 * Product entity
 * 
 * Last updated: sometime in 2022
 * @deprecated This class needs refactoring (but it's not actually deprecated)
 */
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private double price;
    
    private BigDecimal discountPrice;
    
    private String description;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
    
    private String status = "ACTIVE";
    
    private String quantity;
    
    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    private List<OrderItem> orderItems;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;
    
    private String legacyCode;
    
    private Integer stockQuanitty;
    
    public String internalNotes;
    
    private String sku_code;
    
    // Default constructor
    public Product() {

        this.createdAt = new Date();
    }
    
    public Product(Long id, String name, double price, BigDecimal discountPrice, 
                   String description, Date createdAt, Date updatedAt, String status,
                   String quantity, Category category, String legacyCode, 
                   Integer stockQuanitty, String internalNotes, String sku_code) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.discountPrice = discountPrice;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.quantity = quantity;
        this.category = category;
        this.legacyCode = legacyCode;
        this.stockQuanitty = stockQuanitty;
        this.internalNotes = internalNotes;
        this.sku_code = sku_code;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    
    public BigDecimal getDiscountPrice() { return discountPrice; }
    public void setDiscountPrice(BigDecimal discountPrice) { this.discountPrice = discountPrice; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    
    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getQuantity() { return quantity; }
    public void setQuantity(String quantity) { this.quantity = quantity; }
    
    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }
    
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    
    public String getLegacyCode() { return legacyCode; }
    public void setLegacyCode(String legacyCode) { this.legacyCode = legacyCode; }
    
    public Integer getStockQuanitty() { return stockQuanitty; }
    public void setStockQuanitty(Integer stockQuanitty) { this.stockQuanitty = stockQuanitty; }
    
    public String getSku_code() { return sku_code; }
    public void setSku_code(String sku_code) { this.sku_code = sku_code; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return id != null && id.equals(product.id);
    }
    
    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", category=" + category +  // This could trigger lazy loading!
                ", orderItems=" + orderItems +  // This too!
                '}';
    }
}
