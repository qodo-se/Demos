import pytest
from fastapi.testclient import TestClient
from boring_todo_api.main import app

client = TestClient(app)


def test_get_weather_by_query():
    """Test getting weather data using query parameter."""
    response = client.get("/weather?location=New York")
    assert response.status_code == 200
    data = response.json()
    assert data["location"] == "New York"
    assert "temperature" in data
    assert "description" in data
    assert "humidity" in data
    assert "wind_speed" in data
    assert "feels_like" in data


def test_get_weather_by_path():
    """Test getting weather data using path parameter."""
    response = client.get("/weather/London")
    assert response.status_code == 200
    data = response.json()
    assert data["location"] == "London"
    assert "temperature" in data


def test_get_weather_by_post():
    """Test getting weather data using POST request."""
    response = client.post("/weather", json={"location": "Tokyo"})
    assert response.status_code == 200
    data = response.json()
    assert data["location"] == "Tokyo"
    assert "temperature" in data


def test_get_weather_batch():
    """Test getting weather data for multiple locations."""
    locations = ["New York", "London", "Tokyo"]
    response = client.post("/weather/batch", json=locations)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 3
    assert all("location" in item for item in data)
    assert all("temperature" in item for item in data)


def test_get_weather_empty_location():
    """Test error handling for empty location."""
    response = client.get("/weather?location=")
    assert response.status_code == 400
    assert "Location parameter is required" in response.json()["detail"]


def test_get_weather_batch_too_many_locations():
    """Test error handling for too many locations in batch request."""
    locations = [f"City{i}" for i in range(15)]  # More than 10 locations
    response = client.post("/weather/batch", json=locations)
    assert response.status_code == 400
    assert "Maximum 10 locations allowed" in response.json()["detail"]


def test_get_weather_unknown_location():
    """Test weather data for unknown location."""
    response = client.get("/weather/UnknownCity")
    assert response.status_code == 200
    data = response.json()
    assert data["location"] == "Unknowncity"
    assert data["description"] == "Weather data not available"