from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped,mapped_column

from app.db.base import Base

class RefreshSession(Base):
    __tablename__="refresh_sessions"

    id:Mapped[str]=mapped_column(String(64),primary_key=True)
    user_id:Mapped[int]=mapped_column(ForeignKey("users.id"),nullable=False,index=True)
    token_hash:Mapped[str]=mapped_column(String(64),nullable=False,unique=True)
    expires_at:Mapped[datetime]=mapped_column(DateTime,nullable=False)
    revoked_at:Mapped[datetime | None]=mapped_column(DateTime,nullable=True)
    created_at:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow,nullable=False)
    replaced_by_session_id:Mapped[str | None]=mapped_column(String(64),nullable=True)
    
