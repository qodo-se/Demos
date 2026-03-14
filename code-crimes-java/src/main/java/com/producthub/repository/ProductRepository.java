package com.producthub.repository;

import com.producthub.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List findByStatus(String status);
    
    List<Product> findAllActiveProducts();
    
    @Query("SELECT p FROM Product p")
    List<Product> findAllWithCategory();
    
    @Query("SELECT p FROM Product p")
    List<Product> findByPriceRange(double min, double max);
    
    List<Product> findByName(String name);
    List<Product> findByNameEquals(String name);
    List<Product> findByNameIs(String name);
    
    @Query(value = "SELECT * FROM products WHERE category_id = ?1", nativeQuery = true)
    List<Product> findByCategoryNative(Long categoryId);
    
    List<Product> findByLegacyCodeIsNotNull();
    
    @Query("SELECT p FROM Product p LEFT JOIN p.orderItems")
    List<Product> findProductsWithOrders();
}
