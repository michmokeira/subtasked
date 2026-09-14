from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional, Literal
from datetime import datetime


# -------- Subtask --------

class SubtaskBase(BaseModel):
    title: str
    estimated_minutes: Optional[int] = Field(default=None, ge=0)
    deadline: Optional[datetime] = None


class SubtaskCreate(SubtaskBase):
    pass


class Subtask(SubtaskBase):
    id: int
    is_completed: bool

    # Allows Pydantic to read data from SQLAlchemy model attributes
    model_config = ConfigDict(from_attributes=True)

class SubtaskUpdate(BaseModel):
    title: Optional[str] = None
    estimated_minutes: Optional[int] = None
    deadline: Optional[datetime] = None


# -------- Goal --------

class GoalBase(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None


class GoalCreate(GoalBase):
    pass


class Goal(GoalBase):
    id: int

    # Allows Pydantic to read data from SQLAlchemy model attributes
    model_config = ConfigDict(from_attributes=True)

class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None


class GoalProgress(BaseModel):
    goal_id: int
    progress: int

class TaskProgress(BaseModel):
    task_id: int
    progress: int


# -------- Task --------

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    
    # Time estimate is optional
    estimated_minutes: Optional[int] = Field(default=None, ge=0)
    actual_minutes: Optional[int] = Field(default=None, ge=0)  

    # A task can exist without belonging to a goal
    goal_id: Optional[int] = None

    
    deadline: Optional[datetime] = None
    focus_level: Optional[Literal["shallow", "deep"]] = "shallow"  # Allowed focus levels


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    estimated_minutes: Optional[int] = Field(default=None, ge=0)
    actual_minutes: Optional[int] = Field(default=None, ge=0)
    deadline: Optional[datetime] = None
    focus_level: Optional[Literal["shallow", "deep"]] = None
    goal_id: Optional[int] = None


class Task(TaskBase):
    id: int
    is_completed: bool
    actual_minutes: Optional[int] = None
    created_at: datetime

    # A task response can include its subtasks
    subtasks: List[Subtask] = Field(default_factory=list)
  
    # Allows Pydantic to read data from SQLAlchemy model attributes
    model_config = ConfigDict(from_attributes=True)


# -------- Paused / Future Features --------

# These schemas belong to an older version of Subtasked.
# Planner and Review are currently paused and are not part of V1.


# -------- Review Entry --------

class ReviewEntryBase(BaseModel):
    highlights: str
    lessons_learned: str
    improvements: str


class ReviewEntryCreate(ReviewEntryBase):
    pass


class ReviewEntry(ReviewEntryBase):
    id: int
    date: datetime

    # Allows Pydantic to read data from SQLAlchemy model attributes
    model_config = ConfigDict(from_attributes=True)


# -------- Planner Log --------

class PlannerLogBase(BaseModel):
    planned_tasks: str
    actual_tasks: str
    notes: str


class PlannerLogCreate(PlannerLogBase):
    pass


class PlannerLog(PlannerLogBase):
    id: int
    date: datetime

    # Allows Pydantic to read data from SQLAlchemy model attributes
    model_config = ConfigDict(from_attributes=True)