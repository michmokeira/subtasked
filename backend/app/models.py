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

    tasks = relationship("Task", back_populates="goal", cascade="all, delete")


# -------- Task --------
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    is_completed = Column(Boolean, default=False)
    estimated_minutes = Column(Integer)
    actual_minutes = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    goal_id = Column(Integer, ForeignKey("goals.id"), nullable=True)
    goal = relationship("Goal", back_populates="tasks")

    subtasks = relationship("Subtask", back_populates="task", cascade="all, delete")


# -------- Subtask --------
class Subtask(Base):
    __tablename__ = "subtasks"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    title = Column(String, nullable=False)
    is_completed = Column(Boolean, default=False)
    focus_level = Column(String, default="deep")

    task = relationship("Task", back_populates="subtasks")

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
