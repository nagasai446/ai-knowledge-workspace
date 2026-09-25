from datetime import datetime, timedelta

import jwt

from fastapi import (APIRouter, Cookie, Depends, HTTPException, Response, status)
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.config import settings
from app.core.security import (create_access_token, create_refresh_token, decode_refresh_token, generate_session_id, hash_refresh_token)
from app.db.session import get_db
from app.models.refresh_session import RefreshSession
from app.repositories.auth_repository import AuthRepository
from app.schemas.auth import (LoginRequest, LoginResponse, RegisterRequest, UserResponse)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/api/v1/auth",tags=["Authentication"],)

@router.post("/register", response_model=UserResponse, status_code = status.HTTP_201_CREATED)

async def register(data:RegisterRequest,db:Session=Depends(get_db)):
    
    try:
        user = AuthService.register(db, data.email, data.password,)
    
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail=str(error))

    return user

@router.post("/login", response_model=LoginResponse)

async def login(data:LoginRequest, response:Response, db:Session=Depends(get_db)):

    user =AuthService.authenticate(db, data.email, data.password)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid email or password")

    access_token, refresh_token =(AuthService.create_session(db, user,))

    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS*24*60*60)

    return {
        "access_token":access_token,
        "token_type":"bearer",
        "user":user
    }

@router.get("/me",response_model=UserResponse)

async def get_me(current_user=Depends(get_current_user)):
    return current_user



@router.post("/refresh",response_model=LoginResponse)

async def refresh(response:Response, refresh_token:str | None = Cookie(default = None), db:Session = Depends(get_db),):
    
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Refresh token missing")

    try:
        payload = decode_refresh_token(refresh_token)

        user_id = int(payload["sub"])
        session_id = payload["sid"]

    except(jwt.InvalidTokenError,KeyError,ValueError,TypeError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid or expired refresh token")

    session = (AuthRepository.get_refresh_session(db, session_id))

    if not session:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Refresh Session not found")
    
    if session.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid refresh session",)

    incoming_token_hash = (hash_refresh_token(refresh_token))

    if (incoming_token_hash!=session.token_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid Refresh token")

    if session.revoked_at is not None:

        AuthRepository.revoke_all_user_sessions(db, user_id)

        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Refresh token has been revoked")

    if (session.expires_at <= datetime.utcnow()):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Refresh session expired")

    user = AuthRepository.get_by_id(db, user_id)

    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="User not found or inactive")

    new_session_id = (generate_session_id())

    new_refresh_token = (create_refresh_token(user.id, new_session_id))

    new_token_hash = (hash_refresh_token(new_refresh_token))

    new_expires_at = (datetime.utcnow() + timedelta(days = settings.REFRESH_TOKEN_EXPIRE_DAYS))

    new_session = RefreshSession(id=new_session_id, user_id=user.id, token_hash=new_token_hash, expires_at=new_expires_at)

    session.revoked_at = datetime.utcnow()

    session.replaced_by_session_id = (new_session_id)

    db.add(new_session)
    db.commit()

    new_access_token = (create_access_token(user.id))

    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
    )

    return {
        "access_token": new_access_token,
        "token_type": "bearer",
        "user": user,
    }



@router.post("/logout")

async def logout(response:Response, refresh_token:str | None = Cookie(default=None), db:Session = Depends(get_db),):
    
    if refresh_token:

        try:
            payload = decode_refresh_token(refresh_token)

            session_id = payload["sid"]

            session = (AuthRepository.get_refresh_session(db, session_id))

            if (session and session.revoked_at is None):
                
                session.revoked_at = (datetime.utcnow())
                db.commit()

        except (jwt.InvalidTokenError, KeyError, ValueError, TypeError):
                
            pass

    response.delete_cookie(key="refresh_token",httponly=True,secure=False,samesite="lax")

    return { "message" : "Logged out successfully"}