from fastapi import FastAPI
from . import routes  # import your route file

app = FastAPI()

# Include routes from routes.py
app.include_router(routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Subtasked API"}
