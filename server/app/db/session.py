from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings


engine = create_engine(settings.DATABASE_URL,echo=False)

sessionLocal = sessionmaker(autocommit=False,bind=engine,autoflush=False,)

def get_db()->Generator[Session,None,None]:
    db=sessionLocal()

    try:
        yield db
    finally:
        db.close()