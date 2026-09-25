import jwt

from fastapi import Depends,HTTPException,status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.db.session import get_db
from app.repositories.auth_repository import AuthRepository

bearer_scheme = HTTPBearer(auto_error=False)

def get_current_user(credentials:HTTPAuthorizationCredentials | None =Depends(bearer_scheme), db:Session = Depends(get_db),):
    
    if not credentials:
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Authentication required",headers={"WWW-Authenticate":"Bearer"})

    token = credentials.credentials

    try:
        payload = decode_access_token(token)
        
        user_id = int(payload["sub"])

    except(jwt.InvalidTokenError,KeyError,ValueError,):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid or expired access token",headers={"WWW-Authenticate":"Bearer"})

    user = AuthRepository.get_by_id(db,user_id)

    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="User not found or Inactive",headers={"WWW-Authenticate":"Bearer"})

    return user
        

