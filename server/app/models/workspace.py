from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped,mapped_column

from app.db.base import Base

class Workspace(Base):
    __tablename__="workspaces"
    id:Mapped[int]=mapped_column(primary_key=True,autoincrement=True)
    name:Mapped[str]=mapped_column(String(225),nullable=False)
    description:Mapped[str | None]=mapped_column(String(500),nullable=True)
    owner_id:Mapped[int]=mapped_column(ForeignKey("users.id"),nullable=False,index=True)
    created_at:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow,nullable=False)
    updated_at:Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow,onupdate=datetime.utcnow,nullable=False)
