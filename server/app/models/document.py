from datetime import datetime

from sqlalchemy import DateTime,ForeignKey, Integer, String, func

from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

class Document(Base):
    __tablename__="documents"

    id:Mapped[int]=mapped_column(Integer, primary_key=True, index=True)

    workspace_id:Mapped[int]=mapped_column(ForeignKey("workspaces.id",ondelete="CASCADE"),nullable=False,index=True)

    original_filename:Mapped[str]=mapped_column(String(255),nullable=False)

    stored_filename:Mapped[str]=mapped_column(String(255),nullable=False,unique=True)

    content_type:Mapped[str]=mapped_column(String(100),nullable=False)

    size_bytes:Mapped[int] =mapped_column(Integer,nullable=False)

    status:Mapped[str]=mapped_column(String(30),nullable=False,default="uploaded")

    created_at:Mapped[datetime]=mapped_column(DateTime(timezone=True),server_default=func.now(),nullable=False)

    