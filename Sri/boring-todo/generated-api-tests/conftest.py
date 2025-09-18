import pytest
import requests

BASE_URL = "http://localhost:8000"

@pytest.fixture(scope="session")
def auth_token():
    response = requests.post(f"{BASE_URL}/login", json={"username": "demo@demo.demo", "password": "demo"})
    response.raise_for_status()
    return response.json()["access_token"]
