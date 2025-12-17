# ProductHub - Java Spring Code Crimes Demo

> ⚠️ **WARNING**: This project is intentionally designed with common coding mistakes and anti-patterns for **educational purposes only**. Do NOT use this code in production!

## Overview

ProductHub is a Spring Boot e-commerce API that demonstrates common coding issues, anti-patterns, and "code crimes" that developers often make in real-world Java/Spring projects. This project serves as a learning tool to help identify and understand these issues.

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database** (in-memory)
- **Maven**

## Running the Project

```bash
cd code-crimes-java
./mvnw spring-boot:run
```

The application will start at `http://localhost:8080`

Access H2 Console at: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:producthub`
- Username: `sa`
- Password: (empty)

---

# 🚨 Code Crimes Catalog

## 1. Entity/Model Issues

### Product.java
| Issue | Description |
|-------|-------------|
| **Inconsistent Money Types** | Uses both `double price` and `BigDecimal discountPrice` |
| **java.util.Date** | Should use `java.time.LocalDateTime` |
| **EAGER Fetching** | `@OneToMany` with `FetchType.EAGER` causes N+1 problems |
| **equals() without hashCode()** | Only implements `equals()` |
| **Mutable Date Returns** | Getters return mutable Date objects |
| **Field Typos** | `stockQuanitty` instead of `stockQuantity` |
| **Public Fields** | `public String internalNotes` breaks encapsulation |
| **Snake_case in Java** | `sku_code` instead of `skuCode` |
| **Too Many Constructor Params** | Constructor with 14 parameters |
| **toString() with Lazy Fields** | Can trigger LazyInitializationException |

### Customer.java
| Issue | Description |
|-------|-------------|
| **Redundant Fields** | Both `fullName` AND `firstName`/`lastName` |
| **Duplicate Address Fields** | `address` String + separate `street`, `city`, etc. |
| **Age Field** | Storing `age` which changes over time |
| **Date as String** | `dateOfBirth` stored as String |
| **Multiple Active Flags** | `isActive` (boolean), `active` (Boolean), `enabled` (int) |

### Order.java
| Issue | Description |
|-------|-------------|
| **Multiple Status Fields** | `status`, `orderStatus`, `paymentStatus`, `shippingStatus`, `statusCode` |
| **Order Number as Long** | Can't have leading zeros |
| **JSON as String** | `metadata` stores JSON as plain String |
| **Inconsistent Types** | `taxAmount` (float), `discountAmount` (Double) |

---

## 2. Repository Issues

### ProductRepository.java
| Issue | Description |
|-------|-------------|
| **Raw Types** | `List findByStatus()` without generic type |
| **Misleading Method Names** | `findAllWithCategory()` doesn't actually fetch category |
| **Duplicate Methods** | `findByName`, `findByNameEquals`, `findByNameIs` |
| **Unnecessary Native Query** | Using native SQL when JPQL works |
| **N+1 Query Setup** | `findProductsWithOrders()` without proper JOIN FETCH |

---

## 3. Service Layer Issues

### ProductService.java (God Class)
| Issue | Description |
|-------|-------------|
| **Field Injection** | `@Autowired` on fields instead of constructor |
| **God Method** | `processProductOrder()` is 150+ lines with 11 parameters |
| **Deep Nesting** | 5+ levels of if/else nesting |
| **Duplicate Code** | Coupon logic duplicated in multiple methods |
| **Magic Strings** | Hardcoded "SAVE10", "SAVE20", "FREESHIP" |
| **Magic Numbers** | `25.99`, `5.99`, `4.99`, `0.08` scattered throughout |
| **Empty Catch Blocks** | `catch (Exception e) {}` |
| **System.out.println** | Using print statements instead of logging |
| **printStackTrace()** | In production code |
| **String Concatenation** | `result = result + "..."` in loops |
| **Mutable Static Field** | `public static int productCount` |
| **Side Effects in Finders** | `findActiveProducts()` modifies state |
| **Raw Types** | `List getProductsByCategory()` |
| **Optional Misuse** | `.orElse(null)` then null dereference |

### OrderService.java
| Issue | Description |
|-------|-------------|
| **Circular Dependency** | Injects `ProductService` which may inject `OrderService` |
| **Missing @Transactional** | `createOrder()` without transaction |
| **Multiple Responsibilities** | `processOrderAndGenerateInvoice()` does too much |
| **N+1 Query** | `getOrderSummaries()` loops through orders accessing lazy fields |
| **Inconsistent Return Type** | `findOrder()` returns `Object` (String or Order) |

### ReportService.java
| Issue | Description |
|-------|-------------|
| **Thread-unsafe SimpleDateFormat** | Shared instance of `SimpleDateFormat` |
| **Mutable Shared State** | `reportLog` list modified by multiple calls |
| **In-Memory Filtering** | Loads all orders then filters in Java |
| **Manual Bubble Sort** | Instead of using Collections.sort() |
| **Raw Types** | `ArrayList` and `HashMap` without generics |

---

## 4. Controller Issues

### ProductController.java
| Issue | Description |
|-------|-------------|
| **Repository + Service Injection** | Should only use service layer |
| **Business Logic in Controller** | Validation, field mapping in controller |
| **State in Controller** | `requestCount` instance variable |
| **Inconsistent Paths** | `/product/{id}`, `/products/get/{id}`, `/products/{id}` |
| **Too Many @RequestParams** | 11 parameters in `processOrder()` |
| **Search Logic in Controller** | Entire search/filter implementation |
| **Generic @ExceptionHandler** | Catches all exceptions |

### OrderController.java
| Issue | Description |
|-------|-------------|
| **GET Modifies Data** | `/orders/{id}/process` is GET but modifies state |
| **Inconsistent Path Style** | Different from ProductController |
| **Map Return Types** | Returns `List<Map<String, Object>>` |
| **Missing Implementation** | `cancelOrder()` just prints |

### CustomerController.java
| Issue | Description |
|-------|-------------|
| **No Service Layer** | Directly uses repository |
| **Different API Version** | `/api/v1/customers` vs `/api/products` |
| **PUT for Partial Update** | Should use PATCH |
| **Map<String, Object> Input** | Instead of DTO |

---

## 5. Utility Class Issues

### Helper.java
| Issue | Description |
|-------|-------------|
| **Non-final Static Fields** | `DEFAULT_STATUS` is mutable |
| **Thread-unsafe SimpleDateFormat** | Static shared instances |
| **Duplicate Constants** | `STATUS_ACTIVE` String and `STATUS_CODE_ACTIVE` int |
| **Boolean Parameter** | `formatPrice(price, includeCurrency)` |
| **Swallowing Exceptions** | `parseDate()` returns null on error |
| **Modifying Arguments** | `normalizeCustomerData()` mutates Customer |
| **Generic Filter Methods** | `filterActiveProducts()` belongs in service |
| **Thread.sleep()** | `waitForProcessing()` with arbitrary 1000ms |
| **Unused Methods** | `generateId()`, `logDebug()` |

---

## 6. DTO Issues

### ProductDTO.java
| Issue | Description |
|-------|-------------|
| **Mirrors Entity** | No real purpose for the DTO |
| **Mutable** | All fields have setters |
| **Mixed Types** | `price` (double), `discountPrice` (String) |
| **Typo Preserved** | `stockQuanitty` from entity |
| **Circular References** | Contains `List<OrderItemDTO>` and `CategoryDTO` |
| **Public Field** | `public String internalNotes` |

---

## 7. General Code Smells

| Category | Examples |
|----------|----------|
| **Dead Code** | `legacyProductImport()`, `deprecatedMethod()` |
| **TODO/FIXME** | Scattered throughout without tickets |
| **Outdated Javadoc** | "Last updated: sometime in 2022" |
| **Inconsistent Naming** | camelCase, snake_case mixed |
| **Missing Validation** | No `@Valid`, no null checks |
| **No Logging** | Using `System.out.println` everywhere |
| **No Tests** | Zero test coverage |

---

## How to Use This Project

### For Code Review Training
1. Open any file and try to identify issues
2. Compare your findings with this README
3. Discuss how to fix each issue

### For Static Analysis Demo
Run your favorite static analysis tool and see what it catches:
```bash
# Example with SpotBugs
./mvnw spotbugs:check

# Example with PMD
./mvnw pmd:check

# Example with Checkstyle
./mvnw checkstyle:check
```

### For Refactoring Practice
Pick a file and refactor it following best practices:
- Extract methods
- Apply SOLID principles
- Add proper logging
- Write unit tests

---

## What This Project Demonstrates

✅ Common issues found in enterprise Java codebases  
✅ Anti-patterns in Spring Boot applications  
✅ Code smells that accumulate over time  
✅ Technical debt examples  

❌ Does NOT include security vulnerabilities  
❌ Does NOT include intentionally broken functionality  

---

## License

This code is provided for educational purposes only.
