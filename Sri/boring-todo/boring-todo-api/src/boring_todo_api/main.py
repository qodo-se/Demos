from fastapi import FastAPI, HTTPException, Path, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Support both common Next.js ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Data models
class TodoItem(BaseModel):
    id: str
    text: str
    completed: bool


class TodoItemCreate(BaseModel):
    text: str
    completed: Optional[bool] = False
    
    class Config:
        schema_extra = {
            "example": {
                "text": "Learn to sail the seven seas",
                "completed": False
            }
        }


class TodoItemUpdate(BaseModel):
    text: Optional[str] = None
    completed: Optional[bool] = None
    
    class Config:
        schema_extra = {
            "example": {
                "text": "Updated task text",
                "completed": True
            }
        }


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
    # Validate text is not empty after trimming
    text = item.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty, ye landlubber!")
    
    # Check for duplicates
    if any(existing_item["text"] == text for existing_item in todo_items):
        raise HTTPException(status_code=400, detail="Duplicate todo item, savvy!")
    
    new_item = {"id": str(uuid.uuid4()), "text": text, "completed": item.completed}
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
                # Validate text is not empty after trimming
                text = item_update.text.strip()
                if not text:
                    raise HTTPException(status_code=400, detail="Text cannot be empty, ye scallywag!")
                
                # Check for duplicates (excluding current item)
                if any(existing_item["text"] == text and existing_item["id"] != item_id 
                       for existing_item in todo_items):
                    raise HTTPException(status_code=400, detail="Duplicate todo item, arrr!")
                
                item["text"] = text
            if item_update.completed is not None:
                item["completed"] = item_update.completed
            return item
    raise HTTPException(status_code=404, detail="Item not found, matey!")


# DELETE - Remove an item
@app.delete("/items/{item_id}", status_code=204)
async def delete_item(
    item_id: str = Path(..., description="The ID of the item to delete")
):
    for index, item in enumerate(todo_items):
        if item["id"] == item_id:
            todo_items.pop(index)
            return
    raise HTTPException(status_code=404, detail="Item not found, ye scurvy dog!")
