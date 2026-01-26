package com.producthub.repository;

import com.producthub.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    Customer findByEmail(String email);
    Optional<Customer> findOneByEmail(String email);
    List<Customer> findAllByEmail(String email);
    
    @Query("SELECT c FROM Customer c LEFT JOIN FETCH c.orders")
    List<Customer> findAllWithOrders();
    
    List<Customer> findByIsActiveTrue();
    List<Customer> findByActiveTrue();
    List<Customer> findByEnabled(int enabled);
    
    @Query("SELECT c FROM Customer c")
    List<Customer> findAllCustomers();
}
