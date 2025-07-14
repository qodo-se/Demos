# Technology Stack

## Framework & Runtime
- **FastAPI** - Modern Python web framework for building APIs
- **Python 3.13+** - Required Python version
- **Uvicorn** - ASGI server for running the FastAPI application

## Key Dependencies
- `fastapi` (0.115.11) - Web framework
- `uvicorn` (0.34.0) - ASGI server
- `pydantic` - Data validation and serialization (via FastAPI)

## Development Dependencies
- `pytest` - Testing framework
- `httpx` - HTTP client for testing
- `pytest-asyncio` - Async testing support
- `pytest-sugar` - Enhanced test output
- `pytest-cov` - Code coverage reporting

## Build System
- **Poetry** - Dependency management and packaging
- Uses `pyproject.toml` for configuration

## Common Commands

### Development
```bash
# Install dependencies
poetry install

# Run the development server
poetry run uvicorn src.boring_todo_api.main:app --reload --port 8000

# Run tests
poetry run pytest

# Run tests with coverage
poetry run pytest --cov=src/boring_todo_api --cov-report=term-missing
```

### Testing Configuration
- Tests are configured to run with verbose output, short tracebacks, and coverage reporting
- Coverage reports are generated in both terminal and XML formats
- Test files should be placed in `src/boring_todo_api/tests/`