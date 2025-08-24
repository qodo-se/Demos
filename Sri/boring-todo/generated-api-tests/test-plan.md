# API Test Plan

This document outlines the test plan for the Todo API.

## 1. Authentication (`/login`)

### Success Criteria

- A user with valid credentials can successfully log in and receive an access token.

### Failure Criteria

- A user with invalid credentials cannot log in and receives an appropriate error message.
- A request with a malformed body results in a validation error.

### Edge Cases

- Test with empty username or password.
- Test with a very long username or password.

## 2. List Items (`/items`)

### Success Criteria

- An authenticated user can retrieve a list of their todo items.
- The list of items is correctly paginated.

### Failure Criteria

- An unauthenticated user cannot retrieve a list of items.

### Edge Cases

- Test with an empty list of items.
- Test with a large number of items to check pagination.

## 3. Create Item (`/items`)

### Success Criteria

- An authenticated user can create a new todo item.
- The new item is correctly stored in the database.

### Failure Criteria

- An unauthenticated user cannot create a new item.
- A request with a malformed body results in a validation error.
- A request with a missing title results in a validation error.

### Edge Cases

- Test with a very long title.
- Test with special characters in the title.

## 4. Get Item (`/items/{item_id}`)

### Success Criteria

- An authenticated user can retrieve a specific todo item by its ID.

### Failure Criteria

- An unauthenticated user cannot retrieve an item.
- A user cannot retrieve an item that does not belong to them.
- Requesting an item with a non-existent ID results in a "Not Found" error.

### Edge Cases

- Test with a very large item ID.
- Test with a non-integer item ID.

## 5. Update Item (`/items/{item_id}`)

### Success Criteria

- An authenticated user can update a specific todo item.
- The item is correctly updated in the database.

### Failure Criteria

- An unauthenticated user cannot update an item.
- A user cannot update an item that does not belong to them.
- Updating an item with a non-existent ID results in a "Not Found" error.
- A request with a malformed body results in a validation error.

### Edge Cases

- Test with a very long title.
- Test with special characters in the title.
- Test updating only the title.
- Test updating only the `is_completed` status.

## 6. Delete Item (`/items/{item_id}`)

### Success Criteria

- An authenticated user can delete a specific todo item.
- The item is correctly deleted from the database.

### Failure Criteria

- An unauthenticated user cannot delete an item.
- A user cannot delete an item that does not belong to them.
- Deleting an item with a non-existent ID results in a "Not Found" error.

### Edge Cases

- Test with a very large item ID.
- Test with a non-integer item ID.
