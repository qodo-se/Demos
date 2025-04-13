from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/items")
async def list_items():
    return [
        {"text": "hello world", "completed": False},
        {"text": "foo bar", "completed": False},
        {"text": "lorem ipsum", "completed": False},
    ]
