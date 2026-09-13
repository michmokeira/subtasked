from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models, routes
from .db import engine


app = FastAPI()


# Create database tables if they do not already exist
models.Base.metadata.create_all(bind=engine)


# Allow the frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register the API routes
app.include_router(routes.router)


# ------------------ ROOT ROUTE ------------------

# Basic endpoint to confirm that the API is running
@app.get("/")
def read_root():
    return {"message": "Welcome to Subtasked API"}