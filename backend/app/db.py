from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


# Create SQLite database file
DATABASE_URL = "sqlite:///./subtasked.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# Provide a database session to API routes
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()