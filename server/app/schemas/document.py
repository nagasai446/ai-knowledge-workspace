from datetime import datetime
from pydantic import BaseModel, ConfigDict

class DocumentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int
    workspace_id:int
    original_filename:str
    content_type:str
    size_bytes:int
    status:str
    created_at:datetime
    