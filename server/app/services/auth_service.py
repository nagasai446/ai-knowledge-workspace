from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    generate_session_id,
    hash_password,
    hash_refresh_token,
    verify_password
)

from app.models.refresh_session import RefreshSession
from app.models.user import User
from app.repositories.auth_repository import AuthRepository


class AuthService:

    @staticmethod
    def register(db:Session,email:str,password:str,)->User:

        existing_user = AuthRepository.get_by_email(db,email,)

        if existing_user:
            raise ValueError("User with the email already exists")

        user=User(email=email,password_hash=hash_password(password))

        return AuthRepository.create_user(db,user)

    @staticmethod
    def authenticate(db:Session,email:str,password:str,)->User |None:

        user=AuthRepository.get_by_email(db,email,)

        if not user:
            return None
    
        if not user.is_active:
            return None

        if not verify_password(password,user.password_hash):
            return None

        return user

    @staticmethod
    def create_session(db:Session,user:User,)->tuple[str,str]:
      
        session_id=generate_session_id()

        refresh_token = create_refresh_token(user.id,session_id,)

        token_hash=hash_refresh_token(refresh_token)

        expires_at = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

        session = RefreshSession(id=session_id,user_id=user.id,token_hash=token_hash,expires_at=expires_at,)

        AuthRepository.create_refresh_session(db,session)

        access_token = create_access_token(user.id)

        return access_token,refresh_token

