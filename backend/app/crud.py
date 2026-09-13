from sqlalchemy.orm import Session

from . import models, schemas


# ----------- Task CRUD -----------

def create_task(db: Session, task: schemas.TaskCreate):
    # Create a new Task database object from the validated API data
    db_task = models.Task(
        title=task.title,
        description=task.description,
        estimated_minutes=task.estimated_minutes,
        goal_id=task.goal_id
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


def get_all_tasks(db: Session):
    # Retrieve all tasks from the database
    return db.query(models.Task).all()


def get_task_by_id(db: Session, task_id: int):
    # Find one task using its ID
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def update_task(db: Session, task_id: int, task: schemas.TaskUpdate):
    # Find the existing task
    db_task = get_task_by_id(db, task_id)

    if not db_task:
        return None

     # Update only the fields that were provided
    update_data = task.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(db_task, field, value)

    db.commit()
    db.refresh(db_task)

    return db_task


def delete_task(db: Session, task_id: int):
    # Find the task before deleting it
    task = get_task_by_id(db, task_id)

    if task:
        db.delete(task)
        db.commit()

    return task


def mark_task_complete(db: Session, task_id: int):
    # Find the task we want to complete
    task = get_task_by_id(db, task_id)

    if not task:
        return None

    # A task with subtasks can only be completed
    # when all of its subtasks are complete
    if task.subtasks and not all(subtask.is_completed for subtask in task.subtasks):
        raise ValueError("Complete all subtasks before marking the task as complete.")

    task.is_completed = True

    db.commit()
    db.refresh(task)

    return task


# ----------- Subtask CRUD -----------

def add_subtask(db: Session, task_id: int, subtask: schemas.SubtaskCreate):
    # Make sure the parent task exists
    task = get_task_by_id(db, task_id)

    if not task:
        return None

    # Create a new subtask belonging to the task
    db_subtask = models.Subtask(
        title=subtask.title,
        task_id=task_id
    )

    db.add(db_subtask)
    db.commit()
    db.refresh(db_subtask)

    return db_subtask


def get_subtask_by_id(db: Session, subtask_id: int):
    # Find one subtask using its ID
    return (
        db.query(models.Subtask)
        .filter(models.Subtask.id == subtask_id)
        .first()
    )


def update_subtask(
    db: Session,
    subtask_id: int,
    subtask: schemas.SubtaskCreate
):
    # Find the existing subtask
    db_subtask = get_subtask_by_id(db, subtask_id)

    if not db_subtask:
        return None

    db_subtask.title = subtask.title

    db.commit()
    db.refresh(db_subtask)

    return db_subtask


def delete_subtask(db: Session, subtask_id: int):
    # Find the subtask before deleting it
    subtask = get_subtask_by_id(db, subtask_id)

    if subtask:
        db.delete(subtask)
        db.commit()

    return subtask


def mark_subtask_complete(db: Session, subtask_id: int):
    # Find the subtask
    subtask = get_subtask_by_id(db, subtask_id)

    if not subtask:
        return None

    # Mark the subtask as complete
    subtask.is_completed = True

    # Check whether completing this subtask also completes
    # the parent task
    task = subtask.task

    if task and task.subtasks:
        if all(item.is_completed for item in task.subtasks):
            task.is_completed = True

    db.commit()
    db.refresh(subtask)

    return subtask


# ----------- Goal CRUD -----------

def create_goal(db: Session, goal: schemas.GoalCreate):
    # Create a new Goal database object
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
    # Retrieve all goals from the database
    return db.query(models.Goal).all()


def get_goal_by_id(db: Session, goal_id: int):
    # Find one goal using its ID
    return (
        db.query(models.Goal)
        .filter(models.Goal.id == goal_id)
        .first()
    )


def delete_goal(db: Session, goal_id: int):
    # Find the goal before deleting it
    goal = get_goal_by_id(db, goal_id)

    if goal:
        db.delete(goal)
        db.commit()

    return goal


def get_goal_progress(db: Session, goal_id: int):
    # Find the goal
    goal = get_goal_by_id(db, goal_id)

    if not goal:
        return None

    # Get all tasks belonging to this goal
    total_tasks = len(goal.tasks)

    # A goal with no tasks has no completed work yet
    if total_tasks == 0:
        return 0

    completed_tasks = sum(
        1 for task in goal.tasks
        if task.is_completed
    )

    # Calculate progress from completed tasks
    return round((completed_tasks / total_tasks) * 100)


# ----------- Paused / Future Features -----------

# These CRUD functions support the older Planner and Review features.
# #Planner  and Review are currently paused and not a main part of v1



# ----------- Review Entry CRUD -----------

def create_review_entry(db: Session, entry: schemas.ReviewEntryCreate):
    db_entry = models.ReviewEntry(**entry.model_dump())

    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)

    return db_entry


def get_review_entries(db: Session):
    return db.query(models.ReviewEntry).all()


# ----------- PlannerLog CRUD -----------

def create_planner_log(db: Session, log: schemas.PlannerLogCreate):
    db_log = models.PlannerLog(**log.model_dump())

    db.add(db_log)
    db.commit()
    db.refresh(db_log)

    return db_log


def get_planner_logs(db: Session):
    return db.query(models.PlannerLog).all()