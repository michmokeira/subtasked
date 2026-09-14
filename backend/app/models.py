from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base


# -------- Goal --------

class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    deadline = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

    # A goal can have multiple tasks
    tasks = relationship(
        "Task",
        back_populates="goal",
        cascade="all, delete"
    )


# -------- Task --------

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    focus_level = Column(String, default="shallow")
    is_completed = Column(Boolean, default=False)

    # Time estimate and actual time spent on the task
    estimated_minutes = Column(Integer)
    actual_minutes = Column(Integer)
    deadline = Column(DateTime)

    created_at = Column(DateTime, default=datetime.utcnow)

    # goal_id can be empty because a task can exist without a goal
    goal_id = Column(
        Integer,
        ForeignKey("goals.id"),
        nullable=True
    )

    # Connects this task back to its goal
    goal = relationship(
        "Goal",
        back_populates="tasks"
    )

    # A task can have multiple subtasks
    subtasks = relationship(
        "Subtask",
        back_populates="task",
        cascade="all, delete"
    )


# -------- Subtask --------

class Subtask(Base):
    __tablename__ = "subtasks"

    id = Column(Integer, primary_key=True, index=True)

    # Every subtask belongs to a task
    task_id = Column(
        Integer,
        ForeignKey("tasks.id"),
        nullable=False
    )

    title = Column(String, nullable=False)
    is_completed = Column(Boolean, default=False)
    estimated_minutes = Column(Integer)
    deadline = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Connects this subtask back to its parent task
    task = relationship(
        "Task",
        back_populates="subtasks"
    )


# -------- Paused / Future Features --------

##These models models belong to earlier versions of Subtasked

#Planner  and Review are currently paused and not a main part of v1

# -------- Review Entry --------

class ReviewEntry(Base):
    __tablename__ = "review_entries"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    highlights = Column(String)
    lessons_learned = Column(String)
    improvements = Column(String)


# -------- Planner Log --------

class PlannerLog(Base):
    __tablename__ = "planner_logs"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    planned_tasks = Column(String)
    actual_tasks = Column(String)
    notes = Column(String)