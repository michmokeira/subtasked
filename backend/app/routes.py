from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import schemas, crud
from .db import get_db

router = APIRouter()


# ------------------ GOAL ROUTES ------------------

@router.post("/goals", response_model=schemas.Goal)
def create_goal(goal: schemas.GoalCreate, db: Session = Depends(get_db)):
    return crud.create_goal(db, goal)


@router.get("/goals", response_model=list[schemas.Goal])
def get_goals(db: Session = Depends(get_db)):
    return crud.get_all_goals(db)


@router.get("/goals/{goal_id}", response_model=schemas.Goal)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    goal = crud.get_goal_by_id(db, goal_id)

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    return goal

@router.patch("/goals/{goal_id}", response_model=schemas.Goal)
def update_goal(goal_id: int, goal: schemas.GoalUpdate, db: Session = Depends(get_db)):
    updated = crud.update_goal(db, goal_id, goal)

    if not updated:
        raise HTTPException(status_code=404, detail="Goal not found")

    return updated


@router.delete("/goals/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_goal(db, goal_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Goal not found")

    return {"message": "Goal deleted"}

@router.get(
    "/goals/{goal_id}/progress",
    response_model=schemas.GoalProgress
)
def get_goal_progress(goal_id: int, db: Session = Depends(get_db)):
    progress = crud.get_goal_progress(db, goal_id)

    if progress is None:
        raise HTTPException(status_code=404, detail="Goal not found")

    return {"goal_id": goal_id, "progress": progress}

# ------------------ TASK ROUTES ------------------

@router.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_task(db, task)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
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

@router.patch("/tasks/{task_id}", response_model=schemas.Task)
def update_task( task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    try:
        updated = crud.update_task(db, task_id, task)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")

    return updated

@router.patch("/tasks/{task_id}/incomplete", response_model=schemas.Task)
def mark_task_incomplete(task_id: int, db: Session = Depends(get_db)):
    try:
        updated = crud.mark_task_incomplete(db, task_id)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")

    return updated

@router.get("/tasks/{task_id}/progress", response_model=schemas.TaskProgress)
def get_task_progress(task_id: int, db: Session = Depends(get_db)):
    progress = crud.get_task_progress(db, task_id)

    if progress is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"task_id": task_id, "progress": progress}

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_task(db, task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}

@router.patch("/tasks/{task_id}/complete", response_model=schemas.Task)
def mark_task_complete(task_id: int, db: Session = Depends(get_db)):
    try:
        updated = crud.mark_task_complete(db, task_id)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")

    return updated

# ------------------ SUBTASK ROUTES ------------------

@router.post("/tasks/{task_id}/subtasks", response_model=schemas.Subtask)
def create_subtask(task_id: int, subtask: schemas.SubtaskCreate, db: Session = Depends(get_db)):
    created = crud.add_subtask(db, task_id, subtask)

    if not created:
        raise HTTPException(status_code=404, detail="Task not found")

    return created

@router.patch("/subtasks/{subtask_id}/complete", response_model=schemas.Subtask)
def complete_subtask(subtask_id: int, db: Session = Depends(get_db)):
    updated = crud.mark_subtask_complete(db, subtask_id)
    if not updated:
        raise HTTPException(status_code=404, detail="Subtask not found")
    return updated

@router.patch("/subtasks/{subtask_id}/incomplete", response_model=schemas.Subtask)
def mark_subtask_incomplete(subtask_id: int, db: Session = Depends(get_db)):
    updated = crud.mark_subtask_incomplete(db, subtask_id)
    if not updated:
        raise HTTPException(status_code=404, detail="Subtask not found")
    return updated

@router.get("/subtasks/{subtask_id}", response_model=schemas.Subtask)
def get_subtask(subtask_id: int, db: Session = Depends(get_db)):
    subtask = crud.get_subtask_by_id(db, subtask_id)

    if not subtask:
        raise HTTPException(status_code=404, detail="Subtask not found")

    return subtask


@router.patch("/subtasks/{subtask_id}", response_model=schemas.Subtask)
def update_subtask(
    subtask_id: int,
    subtask: schemas.SubtaskUpdate,
    db: Session = Depends(get_db)
):
    updated = crud.update_subtask(db, subtask_id, subtask)

    if not updated:
        raise HTTPException(status_code=404, detail="Subtask not found")

    return updated


@router.delete("/subtasks/{subtask_id}")
def delete_subtask(subtask_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_subtask(db, subtask_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Subtask not found")

    return {"message": "Subtask deleted"}


# ----------- Paused / Future Features -----------

# These routes support the older Planner and Review features.
# Planner  and Review are currently paused and not a main part of v1


# -------- Review Entry Routes --------
@router.post("/reviews", response_model=schemas.ReviewEntry)
def create_review(entry: schemas.ReviewEntryCreate, db: Session = Depends(get_db)):
    return crud.create_review_entry(db, entry)

@router.get("/reviews", response_model=list[schemas.ReviewEntry])
def get_reviews(db: Session = Depends(get_db)):
    return crud.get_review_entries(db)

# -------- Planner Log Routes --------
@router.post("/planner-logs", response_model=schemas.PlannerLog)
def create_planner(log: schemas.PlannerLogCreate, db: Session = Depends(get_db)):
    return crud.create_planner_log(db, log)

@router.get("/planner-logs", response_model=list[schemas.PlannerLog])
def get_planner_logs(db: Session = Depends(get_db)):
    return crud.get_planner_logs(db)
