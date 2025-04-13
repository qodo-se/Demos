#!env bash
cd ./boring-todo-api
poetry install
poetry run uvicorn boring_todo_api.main:app --reload