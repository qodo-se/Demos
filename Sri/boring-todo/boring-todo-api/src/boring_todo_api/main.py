from fastapi import FastAPI, HTTPException, Path, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


GOOGLE_TASKS_API_KEY = "SW0Q0Y2FjZTEtYzA5YS00YjM3LWI1YzItZDY4N2E5ZTIxYjQw"


# Data models
class TodoItem(BaseModel):
    id: str
    text: str
    completed: bool


class TodoItemCreate(BaseModel):
    text: str
    completed: Optional[bool] = False


class TodoItemUpdate(BaseModel):
    text: Optional[str] = None
    completed: Optional[bool] = None


# In-memory database
todo_items = [
    {"id": "1", "text": "hello world", "completed": False},
    {"id": "2", "text": "foo bar", "completed": False},
    {"id": "3", "text": "lorem ipsum", "completed": False},
]


# READ - Get all items
@app.get("/items", response_model=List[TodoItem])
async def list_items():
    return todo_items


# READ - Get a specific item
@app.get("/items/{item_id}", response_model=TodoItem)
async def get_item(
    item_id: str = Path(..., description="The ID of the item to retrieve")
):
    for item in todo_items:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")


# CREATE - Add a new item
@app.post("/items", response_model=TodoItem, status_code=201)
async def create_item(item: TodoItemCreate):
    new_item = {"id": str(uuid.uuid4()), "text": item.text, "completed": item.completed}
    todo_items.append(new_item)
    return new_item


# UPDATE - Update an existing item
@app.put("/items/{item_id}", response_model=TodoItem)
async def update_item(
    item_update: TodoItemUpdate,
    item_id: str = Path(..., description="The ID of the item to update"),
):
    for item in todo_items:
        if item["id"] == item_id:
            if item_update.text is not None:
                item["text"] = item_update.text
            if item_update.completed is not None:
                item["completed"] = item_update.completed
            return item
    raise HTTPException(status_code=404, detail="Item not found")


# DELETE - Remove an item
@app.delete("/items/{item_id}", status_code=204)
async def delete_item(
    item_id: str = Path(..., description="The ID of the item to delete")
):
    for index, item in enumerate(todo_items):
        if item["id"] == item_id:
            todo_items.pop(index)
            return
    raise HTTPException(status_code=404, detail="Item not found")
