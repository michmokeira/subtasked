from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# -------- Subtask --------
class SubtaskBase(BaseModel):
    title: str
    focus_level: Optional[str] = "deep"

class SubtaskCreate(SubtaskBase):
    pass

class Subtask(SubtaskBase):
    id: int
    is_completed: bool

    class Config:
        orm_mode = True


# -------- Goal --------
class GoalBase(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None

class GoalCreate(GoalBase):
    pass

class Goal(GoalBase):
    id: int

    class Config:
        orm_mode = True


# -------- Task --------
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    estimated_minutes: Optional[int] = 0
    goal_id: Optional[int] = None  # ✅ Optional goal link

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    is_completed: bool
    actual_minutes: Optional[int] = 0
    created_at: datetime
    subtasks: List[Subtask] = []

    class Config:
        orm_mode = True

# -------- ReviewEntry --------
class ReviewEntryBase(BaseModel):
    highlights: str
    lessons_learned: str
    improvements: str

class ReviewEntryCreate(ReviewEntryBase):
    pass

class ReviewEntry(ReviewEntryBase):
    id: int
    date: datetime

    class Config:
        orm_mode = True


# -------- PlannerLog --------
class PlannerLogBase(BaseModel):
    planned_tasks: str
    actual_tasks: str
    notes: str

class PlannerLogCreate(PlannerLogBase):
    pass

class PlannerLog(PlannerLogBase):
    id: int
    date: datetime

    class Config:
        orm_mode = True
