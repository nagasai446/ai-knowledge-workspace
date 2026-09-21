from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db

app = FastAPI(
    title="AI Knowledge Workspace API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "message": "AI Knowledge Workspace API is running",
    }

@app.get("/health/database")
async def database_health_check(db:Session=Depends(get_db)):
    result=db.execute(text("SELECT 1"))

    return {
        "status":"ok",
        "database":result.scalar(),
    }