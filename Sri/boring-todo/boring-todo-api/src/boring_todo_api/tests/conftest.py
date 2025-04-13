import pytest
from fastapi.testclient import TestClient
from boring_todo_api.main import app

@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client