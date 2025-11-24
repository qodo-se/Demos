# API Test Plan

This document outlines the test plan for the Boring Todo API.

## 1. Authentication (`/login`)

### Scenario: User Login

*   **Success Criteria:**
    *   A user with valid credentials should receive a `200 OK` response with an access token.
*   **Failure Criteria:**
    *   A user with invalid credentials should receive a `401 Unauthorized` response.
*   **Edge Cases:**
    *   Empty username or password.
    *   Incorrectly formatted credentials.

## 2. Todo Items (`/items`)

### Scenario: Create a new Todo Item

*   **Success Criteria:**
    *   A user can create a new todo item with a valid title and description.
    *   The API should return a `200 OK` response with the newly created item.
*   **Failure Criteria:**
    *   The API should return a `422 Unprocessable Entity` response if the title is missing.
*   **Edge Cases:**
    *   Creating an item with a very long title or description.
    *   Creating an item with special characters in the title or description.

### Scenario: List all Todo Items

*   **Success Criteria:**
    *   A user can retrieve a list of all todo items.
    *   The API should return a `200 OK` response with a list of items.
*   **Failure Criteria:**
    *   None identified.
*   **Edge Cases:**
    *   Retrieving items when the list is empty.

### Scenario: Get a specific Todo Item

*   **Success Criteria:**
    *   A user can retrieve a specific todo item by its ID.
    *   The API should return a `200 OK` response with the requested item.
*   **Failure Criteria:**
    *   The API should return a `404 Not Found` response if the item does not exist.
*   **Edge Cases:**
    *   Requesting an item with a non-existent or invalid ID.

### Scenario: Update a Todo Item

*   **Success Criteria:**
    *   A user can update the title, description, or completion status of a todo item.
    *   The API should return a `200 OK` response with the updated item.
*   **Failure Criteria:**
    *   The API should return a `404 Not Found` response if the item does not exist.
*   **Edge Cases:**
    *   Updating an item with a non-existent or invalid ID.
    *   Updating an item with empty values.

### Scenario: Delete a Todo Item

*   **Success Criteria:**
    *   A user can delete a specific todo item by its ID.
    *   The API should return a `200 OK` response with the deleted item.
*   **Failure Criteria:**
    *   The API should return a `404 Not Found` response if the item does not exist.
*   **Edge Cases:**
    *   Deleting an item with a non-existent or invalid ID.
