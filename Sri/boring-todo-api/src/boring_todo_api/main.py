import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOW_ORIGINS", "http://localhost:3001").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/items")
async def list_items():
    try:
        return [
            {"text": "hello world", "completed": False},
            {"text": "foo bar", "completed": False},
            {"text": "lorem ipsum", "completed": False},
        ]
    except Exception as e:
        return {"error": str(e)}
