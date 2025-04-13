"""
This file contains the tests for the main.py file.
"""


def test_list_items(client):
    response = client.get("/items")
    assert response.status_code == 200
    assert response.json() == [
        {"text": "hello world", "completed": False},
        {"text": "foo bar", "completed": False},
        {"text": "lorem ipsum", "completed": False},
    ]
