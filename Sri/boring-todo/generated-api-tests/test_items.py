import pytest
import requests
from .conftest import BASE_URL

def test_list_items_unauthenticated():
    response = requests.get(f"{BASE_URL}/items")
    assert response.status_code == 401

def test_list_items_success(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(f"{BASE_URL}/items", headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_item_success(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    item_data = {"title": "New Test Item", "description": "A description"}
    response = requests.post(f"{BASE_URL}/items", headers=headers, json=item_data)
    assert response.status_code == 200
    assert response.json()["title"] == item_data["title"]

def test_create_item_malformed(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    item_data = {"description": "A description"}
    response = requests.post(f"{BASE_URL}/items", headers=headers, json=item_data)
    assert response.status_code == 422

def test_get_item_success(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    item_data = {"title": "Another Test Item", "description": "A description"}
    create_response = requests.post(f"{BASE_URL}/items", headers=headers, json=item_data)
    item_id = create_response.json()["id"]
    
    get_response = requests.get(f"{BASE_URL}/items/{item_id}", headers=headers)
    assert get_response.status_code == 200
    assert get_response.json()["id"] == item_id

def test_get_item_not_found(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(f"{BASE_URL}/items/999999", headers=headers)
    assert response.status_code == 404

def test_update_item_success(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    item_data = {"title": "Item to Update", "description": "A description"}
    create_response = requests.post(f"{BASE_URL}/items", headers=headers, json=item_data)
    item_id = create_response.json()["id"]
    
    update_data = {"title": "Updated Item", "is_completed": True}
    update_response = requests.put(f"{BASE_URL}/items/{item_id}", headers=headers, json=update_data)
    assert update_response.status_code == 200
    assert update_response.json()["title"] == update_data["title"]
    assert update_response.json()["is_completed"] == update_data["is_completed"]

def test_delete_item_success(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    item_data = {"title": "Item to Delete", "description": "A description"}
    create_response = requests.post(f"{BASE_URL}/items", headers=headers, json=item_data)
    item_id = create_response.json()["id"]
    
    delete_response = requests.delete(f"{BASE_URL}/items/{item_id}", headers=headers)
    assert delete_response.status_code == 200
    
    get_response = requests.get(f"{BASE_URL}/items/{item_id}", headers=headers)
    assert get_response.status_code == 404
