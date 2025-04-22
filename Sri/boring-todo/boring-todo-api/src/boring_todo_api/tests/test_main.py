"""
This file contains the tests for the main.py file.
"""


def test_list_items(client):
    response = client.get("/items")
    assert response.status_code == 200
    assert response.json() == [
        {"id": "1", "text": "hello world", "completed": False},
        {"id": "2", "text": "foo bar", "completed": False},
        {"id": "3", "text": "lorem ipsum", "completed": False},
    ]


def test_delete_item_not_found(client):
    """
    Test deleting a non-existent todo item.
    """
    response = client.delete("/items/doesnotexist")
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"


def test_delete_item_success(client):
    """
    Test deleting an existing todo item.
    """
    # Create a new item to delete
    create_resp = client.post("/items", json={"text": "to delete"})
    item_id = create_resp.json()["id"]
    delete_resp = client.delete(f"/items/{item_id}")
    assert delete_resp.status_code == 204
    # Verify it's gone
    get_resp = client.get(f"/items/{item_id}")
    assert get_resp.status_code == 404


def test_update_item_not_found(client):
    """
    Test updating a non-existent todo item.
    """
    response = client.put("/items/doesnotexist", json={"text": "irrelevant"})
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"


def test_update_item_text_and_completed(client):
    """
    Test updating an existing todo item's text and completed fields.
    """
    # Create a new item to update
    create_resp = client.post("/items", json={"text": "to update"})
    item_id = create_resp.json()["id"]
    # Update both fields
    update_resp = client.put(f"/items/{item_id}", json={"text": "updated text", "completed": True})
    assert update_resp.status_code == 200
    updated = update_resp.json()
    assert updated["text"] == "updated text"
    assert updated["completed"] is True
    # Clean up
    client.delete(f"/items/{item_id}")


def test_create_item_with_text_only(client):
    """
    Test creating a new todo item with only the required 'text' field.
    """
    response = client.post("/items", json={"text": "new task"})
    assert response.status_code == 201
    data = response.json()
    assert data["text"] == "new task"
    assert data["completed"] is False
    assert isinstance(data["id"], str)
    # Clean up: remove the created item
    client.delete(f"/items/{data['id']}")


def test_get_item_by_id_not_found(client):
    """
    Test retrieving a todo item with a non-existent ID.
    """
    response = client.get("/items/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"


def test_get_item_by_id_success(client):
    """
    Test retrieving a specific todo item by its ID.
    """
    response = client.get("/items/1")
    assert response.status_code == 200
    assert response.json() == {"id": "1", "text": "hello world", "completed": False}
