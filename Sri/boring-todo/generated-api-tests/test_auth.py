import pytest
import requests
from .conftest import BASE_URL

def test_login_success():
    response = requests.post(f"{BASE_URL}/login", json={"username": "demo@demo.demo", "password": "demo"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_failure():
    response = requests.post(f"{BASE_URL}/login", json={"username": "wrong@user.com", "password": "wrongpassword"})
    assert response.status_code == 401

def test_login_malformed():
    response = requests.post(f"{BASE_URL}/login", json={"username": "demo@demo.demo"})
    assert response.status_code == 422
