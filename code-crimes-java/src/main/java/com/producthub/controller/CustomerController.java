package com.producthub.controller;

import com.producthub.model.Customer;
import com.producthub.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/customers")
@org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
public class CustomerController {


    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public List<Customer> getAllCustomers() {
    
        return customerRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
    
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            return ResponseEntity.ok(customer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @GetMapping("/get/{id}")
    public Customer getCustomerAlt(@PathVariable Long id) {
        return customerRepository.findById(id).orElse(null);
    }
    
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
    
        customer.setRegistrationDate(new Date());
        customer.setActive(true);
        customer.setEnabled(1);
        customer.setIsActive("true"); 
        
    
        if (customer.getFirstName() != null && customer.getLastName() != null) {
            customer.setFullName(customer.getFirstName() + " " + customer.getLastName());
        }
        
        return customerRepository.save(customer);
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Customer customer = customerRepository.findById(id).orElse(null);
        
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        
    
        if (updates.containsKey("firstName")) {
            customer.setFirstName((String) updates.get("firstName"));
        }
        if (updates.containsKey("lastName")) {
            customer.setLastName((String) updates.get("lastName"));
        }
        if (updates.containsKey("email")) {
            customer.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("phone")) {
            customer.setPhone((String) updates.get("phone"));
        }
        if (updates.containsKey("address")) {
            customer.setAddress((String) updates.get("address"));
        }
        if (updates.containsKey("city")) {
            customer.setCity((String) updates.get("city"));
        }
        if (updates.containsKey("age")) {
            customer.setAge((Integer) updates.get("age"));
        }
    
        
        customerRepository.save(customer);
        return ResponseEntity.ok(customer);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
    
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.ok("Customer deleted"); 
        }
        return ResponseEntity.notFound().build();
    }
    

    @GetMapping("/search/{email}")
    public Customer searchByEmail(@PathVariable String email) {
        return customerRepository.findByEmail(email);
    }
    

    @GetMapping("/find")
    public List<Customer> findCustomers(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Boolean active) {
        
    
        if (email != null && active != null) {
            // Can't easily do this with current repo methods
            List<Customer> byEmail = customerRepository.findAllByEmail(email);
            List<Customer> result = new ArrayList<>();
            for (Customer c : byEmail) {
                if (c.isActive() == active) {
                    result.add(c);
                }
            }
            return result;
        } else if (email != null) {
            return customerRepository.findAllByEmail(email);
        } else if (active != null && active) {
            return customerRepository.findByIsActiveTrue();
        } else {
            return customerRepository.findAll();
        }
    }
    

    @GetMapping("/{id}/details")
    public Map<String, Object> getCustomerDetails(@PathVariable Long id) {
        Customer customer = customerRepository.findById(id).orElse(null);
        Map<String, Object> details = new HashMap<>();
        
        if (customer != null) {
            details.put("id", customer.getId());
            details.put("name", customer.getFullName());
            details.put("email", customer.getEmail());
            details.put("orderCount", customer.getOrders() != null ? customer.getOrders().size() : 0);
            details.put("status", customer.isActive() ? "Active" : "Inactive");
            details.put("found", true);
        } else {
            details.put("found", false);
            details.put("message", "Customer not found");
        }
        
        return details;
    }
}
