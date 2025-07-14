# Product Overview

This is a basic FastAPI backend service that provides REST APIs for a todo application. The API serves as the backend for the `boring-todo-app` frontend application.

## Core Features
- CRUD operations for todo items (Create, Read, Update, Delete)
- In-memory data storage with pre-seeded sample data
- CORS support for frontend integration
- RESTful API design with proper HTTP status codes

## API Endpoints
- `GET /items` - List all todo items
- `GET /items/{item_id}` - Get specific todo item
- `POST /items` - Create new todo item
- `PUT /items/{item_id}` - Update existing todo item
- `DELETE /items/{item_id}` - Delete todo item

The service is designed to be simple and straightforward, focusing on basic todo functionality without complex features like user authentication or persistent storage.