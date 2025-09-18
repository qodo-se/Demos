from fastapi import FastAPI, HTTPException, Path, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
import httpx
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
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


class TodoItemUpdate(BaseModel):
    text: Optional[str] = None
    completed: Optional[bool] = None


# Weather data models
class WeatherData(BaseModel):
    location: str
    temperature: float
    description: str
    humidity: int
    wind_speed: float
    feels_like: float


class WeatherRequest(BaseModel):
    location: str


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


# Weather service functions
async def fetch_weather_data(location: str) -> WeatherData:
    """
    Fetch weather data from OpenWeatherMap API.
    For demo purposes, using a mock implementation that returns realistic data.
    In production, you would use a real API key and make actual HTTP requests.
    """
    # Mock weather data for demo purposes
    # In a real implementation, you would make an API call to a weather service
    mock_weather_data = {
        "new york": {"temp": 22.5, "desc": "Partly cloudy", "humidity": 65, "wind": 8.2, "feels_like": 24.1},
        "london": {"temp": 15.3, "desc": "Light rain", "humidity": 78, "wind": 12.1, "feels_like": 13.8},
        "tokyo": {"temp": 28.7, "desc": "Sunny", "humidity": 55, "wind": 5.4, "feels_like": 31.2},
        "paris": {"temp": 18.9, "desc": "Overcast", "humidity": 72, "wind": 9.8, "feels_like": 17.5},
        "sydney": {"temp": 25.1, "desc": "Clear sky", "humidity": 60, "wind": 7.3, "feels_like": 26.8},
    }
    
    location_lower = location.lower()
    if location_lower in mock_weather_data:
        data = mock_weather_data[location_lower]
        return WeatherData(
            location=location.title(),
            temperature=data["temp"],
            description=data["desc"],
            humidity=data["humidity"],
            wind_speed=data["wind"],
            feels_like=data["feels_like"]
        )
    else:
        # Return default weather data for unknown locations
        return WeatherData(
            location=location.title(),
            temperature=20.0,
            description="Weather data not available",
            humidity=50,
            wind_speed=5.0,
            feels_like=20.0
        )


# WEATHER ENDPOINTS

# GET weather by location (query parameter)
@app.get("/weather", response_model=WeatherData)
async def get_weather_by_query(location: str):
    """Get weather data for a specific location using query parameter."""
    if not location or not location.strip():
        raise HTTPException(status_code=400, detail="Location parameter is required")
    
    try:
        weather_data = await fetch_weather_data(location.strip())
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch weather data: {str(e)}")


# GET weather by location (path parameter)
@app.get("/weather/{location}", response_model=WeatherData)
async def get_weather_by_path(
    location: str = Path(..., description="The location to get weather for")
):
    """Get weather data for a specific location using path parameter."""
    try:
        weather_data = await fetch_weather_data(location)
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch weather data: {str(e)}")


# POST weather by location (request body)
@app.post("/weather", response_model=WeatherData)
async def get_weather_by_post(weather_request: WeatherRequest):
    """Get weather data for a specific location using POST request body."""
    if not weather_request.location or not weather_request.location.strip():
        raise HTTPException(status_code=400, detail="Location is required")
    
    try:
        weather_data = await fetch_weather_data(weather_request.location.strip())
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch weather data: {str(e)}")


# GET weather for multiple locations
@app.post("/weather/batch", response_model=List[WeatherData])
async def get_weather_batch(locations: List[str] = Body(..., description="List of locations to get weather for")):
    """Get weather data for multiple locations."""
    if not locations:
        raise HTTPException(status_code=400, detail="At least one location is required")
    
    if len(locations) > 10:
        raise HTTPException(status_code=400, detail="Maximum 10 locations allowed per request")
    
    try:
        weather_results = []
        for location in locations:
            if location and location.strip():
                weather_data = await fetch_weather_data(location.strip())
                weather_results.append(weather_data)
        
        return weather_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch weather data: {str(e)}")
