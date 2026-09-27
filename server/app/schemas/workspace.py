from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class WorkspaceCreate(BaseModel):
    name:str = Field(min_length=1, max_length=150)
    description:str | None =Field(default=None, max_length=500)

class WorkspaceUpdate(BaseModel):
    name:str | None = Field(default=None, min_length=1, max_length=150)
    description:str|None = Field(default=None, max_length=500)

class WorkspaceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:int
    name:str
    description:str|None
    owner_id:int
    created_at:datetime
    updated_at:datetime