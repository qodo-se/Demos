
import pytest
import requests

BASE_URL = "http://localhost:8000"
TEST_USER = {"username": "demo@demo.demo", "password": "demo"}

def get_auth_token():
    response = requests.post(f"{BASE_URL}/login", json=TEST_USER)
    response.raise_for_status()
    return response.json()["access_token"]

@pytest.fixture(scope="module")
def auth_headers():
    token = get_auth_token()
    return {"Authorization": f"Bearer {token}"}

def test_login():
    # Success Criteria
    response = requests.post(f"{BASE_URL}/login", json=TEST_USER)
    assert response.status_code == 200
    assert "access_token" in response.json()

    # Failure Criteria
    response = requests.post(f"{BASE_URL}/login", json={"username": "wrong", "password": "user"})
    assert response.status_code == 401

def test_create_item(auth_headers):
    # Success Criteria
    item_data = {"title": "Test Item", "description": "Test Description"}
    response = requests.post(f"{BASE_URL}/items", headers=auth_headers, json=item_data)
    assert response.status_code == 200
    assert response.json()["title"] == item_data["title"]

    # Failure Criteria
    response = requests.post(f"{BASE_URL}/items", headers=auth_headers, json={"description": "Only Description"})
    assert response.status_code == 422

def test_list_items(auth_headers):
    # Success Criteria
    response = requests.get(f"{BASE_URL}/items", headers=auth_headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_item(auth_headers):
    # Create an item to get
    item_data = {"title": "Get Me", "description": "Please"}
    create_response = requests.post(f"{BASE_URL}/items", headers=auth_headers, json=item_data)
    item_id = create_response.json()["id"]

    # Success Criteria
    response = requests.get(f"{BASE_URL}/items/{item_id}", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["id"] == item_id

    # Failure Criteria
    response = requests.get(f"{BASE_URL}/items/99999", headers=auth_headers)
    assert response.status_code == 404

def test_update_item(auth_headers):
    # Create an item to update
    item_data = {"title": "Update Me", "description": "Please"}
    create_response = requests.post(f"{BASE_URL}/items", headers=auth_headers, json=item_data)
    item_id = create_response.json()["id"]

    # Success Criteria
    update_data = {"title": "Updated Title", "completed": True}
    response = requests.put(f"{BASE_EURL}/items/{item_id}", headers=auth_headers, json=update_data)
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Title"
    assert response.json()["completed"] is True

    # Failure Criteria
    response = requests.put(f"{BASE_URL}/items/99999", headers=auth_headers, json=update_data)
    assert response.status_code == 404

def test_delete_item(auth_headers):
    # Create an item to delete
    item_data = {"title": "Delete Me", "description": "Please"}
    create_response = requests.post(f"{BASE_URL}/items", headers=auth_headers, json=item_data)
    item_id = create_response.json()["id"]

    # Success Criteria
    response = requests.delete(f"{BASE_URL}/items/{item_id}", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["id"] == item_id

    # Failure Criteria
    response = requests.delete(f"{BASE_URL}/items/99999", headers=auth_headers)
    assert response.status_code == 404
