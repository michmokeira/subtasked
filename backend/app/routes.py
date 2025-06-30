from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import schemas, models, crud
from .db import SessionLocal

router = APIRouter()

# Dependency: get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------ TASK ROUTES ------------------

@router.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)

@router.get("/tasks", response_model=list[schemas.Task])
def get_tasks(db: Session = Depends(get_db)):
    return crud.get_all_tasks(db)

@router.get("/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task_by_id(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_task(db, task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}

@router.patch("/tasks/{task_id}/complete", response_model=schemas.Task)
def mark_task_complete(task_id: int, db: Session = Depends(get_db)):
    updated = crud.mark_task_complete(db, task_id)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

# ------------------ SUBTASK ROUTES ------------------

@router.post("/tasks/{task_id}/subtasks", response_model=schemas.Subtask)
def create_subtask(task_id: int, subtask: schemas.SubtaskCreate, db: Session = Depends(get_db)):
    return crud.add_subtask(db, task_id, subtask)

@router.patch("/subtasks/{subtask_id}/complete", response_model=schemas.Subtask)
def complete_subtask(subtask_id: int, db: Session = Depends(get_db)):
    updated = crud.mark_subtask_complete(db, subtask_id)
    if not updated:
        raise HTTPException(status_code=404, detail="Subtask not found")
    return updated
