# Project Structure

## Directory Layout
```
src/boring_todo_api/           # Main application package
├── __init__.py               # Package initialization
├── main.py                   # FastAPI application and API endpoints
├── math/                     # Utility modules (example: mathematical operations)
│   ├── __init__.py
│   └── adder.py             # Mathematical utility functions
└── tests/                    # Test suite
    ├── __init__.py
    ├── conftest.py          # Pytest configuration and fixtures
    ├── test_main.py         # Tests for main.py
    └── math/                # Tests for math module
```

## Code Organization Patterns

### Main Application (`main.py`)
- FastAPI app instance and middleware configuration
- Pydantic models for request/response validation
- API endpoint definitions following REST conventions
- In-memory data storage (simple list-based)

### Testing Structure
- Tests mirror the source code structure
- `conftest.py` contains shared fixtures (e.g., test client)
- Test files use `test_` prefix
- Tests use FastAPI's TestClient for endpoint testing

### Utility Modules
- Separate modules for specific functionality (e.g., `math/` for calculations)
- Each module has its own `__init__.py`
- Functions are simple and focused on single responsibilities

## Naming Conventions
- Snake_case for file names, function names, and variables
- PascalCase for Pydantic model classes
- Descriptive endpoint paths (`/items`, `/items/{item_id}`)
- Clear function names that describe their purpose

## Architecture Notes
- Simple, flat structure appropriate for a basic API
- No complex layering or separation of concerns
- Direct endpoint-to-logic mapping in main.py
- Minimal abstraction for simplicity