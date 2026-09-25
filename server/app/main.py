from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.auth import router as auth_router
from app.core.config import settings


app = FastAPI(
    title="AI Knowledge Workspace API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CLIENT_URL],
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

app.include_router(auth_router)