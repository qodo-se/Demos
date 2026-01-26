package com.producthub.dto;

import java.util.List;

public class CategoryDTO {
    
    private Long id;
    private String name;
    private String description;
    private Long parentCategoryId;
    
    private List<CategoryDTO> subCategories;
    
    private List<ProductDTO> products;
    
    private String isActive;  // String
    private Boolean active;   // Boolean wrapper
    private boolean enabled;  // primitive
    
    public CategoryDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Long getParentCategoryId() { return parentCategoryId; }
    public void setParentCategoryId(Long parentCategoryId) { this.parentCategoryId = parentCategoryId; }
    
    public List<CategoryDTO> getSubCategories() { return subCategories; }
    public void setSubCategories(List<CategoryDTO> subCategories) { this.subCategories = subCategories; }
    
    public List<ProductDTO> getProducts() { return products; }
    public void setProducts(List<ProductDTO> products) { this.products = products; }
    
    public String getIsActive() { return isActive; }
    public void setIsActive(String isActive) { this.isActive = isActive; }
    
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
}
