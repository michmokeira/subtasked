from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import crud, models, schemas
from .db import engine, get_db

app = FastAPI()

# Auto-create tables
models.Base.metadata.create_all(bind=engine)

# CORS setup (adjust allow_origins in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- Root Route --------
@app.get("/")
def read_root():
    return {"message": "Welcome to Subtasked API"}

# -------- Goal Routes --------
@app.post("/goals/", response_model=schemas.Goal)
def create_goal(goal: schemas.GoalCreate, db: Session = Depends(get_db)):
    return crud.create_goal(db, goal)

@app.get("/goals/", response_model=List[schemas.Goal])
def get_goals(db: Session = Depends(get_db)):
    return crud.get_all_goals(db)

@app.get("/goals/{goal_id}", response_model=schemas.Goal)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    goal = crud.get_goal_by_id(db, goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal

@app.delete("/goals/{goal_id}", response_model=schemas.Goal)
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    return crud.delete_goal(db, goal_id)

# -------- Review Entry Routes --------
@app.post("/reviews/", response_model=schemas.ReviewEntry)
def create_review(entry: schemas.ReviewEntryCreate, db: Session = Depends(get_db)):
    return crud.create_review_entry(db, entry)

@app.get("/reviews/", response_model=List[schemas.ReviewEntry])
def get_reviews(db: Session = Depends(get_db)):
    return crud.get_review_entries(db)

# -------- Planner Log Routes --------
@app.post("/planner-logs/", response_model=schemas.PlannerLog)
def create_planner(log: schemas.PlannerLogCreate, db: Session = Depends(get_db)):
    return crud.create_planner_log(db, log)

@app.get("/planner-logs/", response_model=List[schemas.PlannerLog])
def get_planner_logs(db: Session = Depends(get_db)):
    return crud.get_planner_logs(db)
