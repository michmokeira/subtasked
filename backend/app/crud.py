from sqlalchemy.orm import Session
from . import models, schemas

# ----------- Task CRUD -----------

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        estimated_minutes=task.estimated_minutes,
        goal_id=task.goal_id  # ✅ allow optional goal link
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_all_tasks(db: Session):
    return db.query(models.Task).all()

def get_task_by_id(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def delete_task(db: Session, task_id: int):
    task = get_task_by_id(db, task_id)
    if task:
        db.delete(task)
        db.commit()
    return task

def mark_task_complete(db: Session, task_id: int):
    task = get_task_by_id(db, task_id)
    if task:
        task.is_completed = True
        db.commit()
        db.refresh(task)
    return task

# ----------- Subtask CRUD -----------

def add_subtask(db: Session, task_id: int, subtask: schemas.SubtaskCreate):
    db_subtask = models.Subtask(
        title=subtask.title,
        task_id=task_id,
        focus_level=subtask.focus_level
    )
    db.add(db_subtask)
    db.commit()
    db.refresh(db_subtask)
    return db_subtask

def mark_subtask_complete(db: Session, subtask_id: int):
    subtask = db.query(models.Subtask).filter(models.Subtask.id == subtask_id).first()
    if subtask:
        subtask.is_completed = True
        db.commit()
        db.refresh(subtask)
    return subtask

# ----------- Goal CRUD -----------

def create_goal(db: Session, goal: schemas.GoalCreate):
    db_goal = models.Goal(
        title=goal.title,
        description=goal.description,
        deadline=goal.deadline
    )
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

def get_all_goals(db: Session):
    return db.query(models.Goal).all()

def get_goal_by_id(db: Session, goal_id: int):
    return db.query(models.Goal).filter(models.Goal.id == goal_id).first()

def delete_goal(db: Session, goal_id: int):
    goal = get_goal_by_id(db, goal_id)
    if goal:
        db.delete(goal)
        db.commit()
    return goal

# ----------- Review Entry CRUD -----------


def create_review_entry(db: Session, entry: schemas.ReviewEntryCreate):
    db_entry = models.ReviewEntry(**entry.dict())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

def get_review_entries(db: Session):
    return db.query(models.ReviewEntry).all()


# ----------- PlannerLog CRUD -----------

def create_planner_log(db: Session, log: schemas.PlannerLogCreate):
    db_log = models.PlannerLog(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

def get_planner_logs(db: Session):
    return db.query(models.PlannerLog).all()

