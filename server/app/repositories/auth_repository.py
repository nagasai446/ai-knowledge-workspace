from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.refresh_session import RefreshSession
from app.models.user import User

class AuthRepository:

    @staticmethod
    def get_by_email(db:Session, email:str,)->User | None:
        statement =select(User).where(User.email == email)
        return db.scalar(statement)

    @staticmethod
    def get_by_id(db:Session,user_id:int)->User | None:
        statement = select(User).where(User.id == user_id)
        return db.scalar(statement)

    @staticmethod
    def create_user(db:Session,user:User)->User:
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def create_refresh_session(db:Session, session:RefreshSession)->RefreshSession:
        db.add(session)
        db.commit()
        db.refresh(session)
        return session

    @staticmethod
    def get_refresh_session(db:Session, session_id:str)->RefreshSession | None:
        statement = select(RefreshSession).where(RefreshSession.id == session_id)
        return db.scalar(statement)

    @staticmethod
    def revoke_session(db:Session,session:RefreshSession,replaced_by_session_id:str | None = None)->None:
        session.revoked_at =datetime.utcnow()
        session.replaced_by_session_id =(
            replaced_by_session_id
        )
        db.commit()

    @staticmethod
    def revoke_all_user_sessions(db:Session,user_id:int)->None:
        statement = select(RefreshSession).where(
            RefreshSession.user_id == user_id,
            RefreshSession.revoked_at.is_(None)
        )
        sessions = db.scalars(statement).all()
        now = datetime.utcnow()
        for session in sessions:
            session.revoked_at = now
        db.commit()

