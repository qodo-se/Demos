from typing import List
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# Define data model for todo items
class TodoItem(BaseModel):
    text: str
    completed: bool = False


app = FastAPI(
    title="Todo API", description="A simple FastAPI todo items service", version="1.0.0"
)

# Configure CORS middleware
import os
origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3001").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/items", response_model=List[TodoItem], tags=["items"])
async def list_items() -> List[TodoItem]:
    """
    Retrieve a list of todo items.

    Returns:
        List[TodoItem]: A list of todo items with text and completed status
    """
    return [
        TodoItem(text="hello world"),
        TodoItem(text="foo bar"),
        TodoItem(text="lorem ipsum"),
    ]
