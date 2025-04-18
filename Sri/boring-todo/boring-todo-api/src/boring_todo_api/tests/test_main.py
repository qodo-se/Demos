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
