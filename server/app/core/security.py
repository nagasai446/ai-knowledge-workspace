from datetime import datetime, timedelta, timezone

import hashlib
import secrets

import jwt
from pwdlib import PasswordHash

from app.core.config import settings

password_hasher = PasswordHash.recommended()

def hash_password(password:str)->str:
    return password_hasher.hash(password)

def verify_password(password:str,hashed_password:str)->bool:
    return password_hasher.verify(password,hashed_password)

def create_access_token(user_id:int,)->str:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    payload ={
        "sub":str(user_id),
        "type":"access",
        "exp":expires_at,
    }

    return jwt.encode(payload,settings.JWT_ACCESS_SECRET,algorithm="HS256")

def create_refresh_token(user_id:int,session_id:str)->str:
    expires_at =datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    payload ={
        "sub":str(user_id),
        "sid":session_id,
        "type":"refresh",
        "exp":expires_at,
    }

    return jwt.encode(payload,settings.JWT_REFRESH_SECRET,algorithm="HS256")

def decode_access_token(token:str)->dict:
    payload = jwt.decode(token,settings.JWT_ACCESS_SECRET,algorithms=["HS256"])

    if payload.get("type")!="access":
        raise jwt.InvalidTokenError("Invalid access token")

    return payload

def decode_refresh_token(token:str)->dict:
    payload = jwt.decode(token,settings.JWT_REFRESH_SECRET,algorithms=["HS256"])

    if payload.get("type")!="refresh":
        raise jwt.InvalidTokenError("Invalid refresh token")

    return payload

def hash_refresh_token(token:str)->str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()

def generate_session_id()->str:
    return secrets.token_urlsafe(32)
