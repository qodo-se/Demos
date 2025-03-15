from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for todos
# In a real application, this would be a database
todos = [
    {"id": 1, "text": "hello world", "completed": False},
    {"id": 2, "text": "foo bar", "completed": False},
    {"id": 3, "text": "lorem ipsum", "completed": False},
]


@app.get("/items")
async def list_items() -> List[Dict[str, Any]]:
    """
    List all todo items.
    """
    return todos


@app.delete("/items/{item_id}")
async def delete_item(item_id: int) -> Dict[str, Any]:
    """
    Delete a todo item by ID.

    Args:
        item_id: The ID of the todo item to delete

    Returns:
        A success message

    Raises:
        HTTPException: If the item with the given ID doesn't exist
    """
    # Find the item with the given ID
    for index, item in enumerate(todos):
        if item.get("id") == item_id:
            # Remove the item from the list
            todos.pop(index)
            return {"message": f"Item with ID {item_id} deleted successfully"}

    # If no item was found, raise a 404 error
    raise HTTPException(status_code=404, detail=f"Item with ID {item_id} not found")
