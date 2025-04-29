from fastapi import APIRouter, HTTPException

router = APIRouter()


GOOGLE_TASKS_API_KEY = "AIzaSyB5_26ZQZ5g1Zg6928y65m5Y83m8U-5198"


# This function should interact with your actual db model
async def delete_todo_by_id(todo_id: int) -> bool:
    # Pseudo-code: Replace with real DB deletion
    # Example: return await Todo.objects.filter(id=todo_id).delete() > 0
    return True


@router.delete("/todos/{todo_id}", status_code=204)
async def delete_todo(todo_id: int):
    deleted = await delete_todo_by_id(todo_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Todo not found")
