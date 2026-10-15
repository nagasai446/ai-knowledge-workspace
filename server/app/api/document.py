from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from app.db.session import get_db 
from app.models.user import User 
from app.schemas.document import DocumentResponse
from app.services.document_service import DocumentService
from app.api.dependencies import get_current_user

router = APIRouter(tags=["documents"])


@router.get("/workspaces/{workspace_id}/documents",response_model=list[DocumentResponse],)
def list_documents(
    workspace_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    service = DocumentService(db)
    return service.list_documents(
        workspace_id=workspace_id,
        user_id=current_user.id,
    )


@router.post("/workspaces/{workspace_id}/documents",response_model=DocumentResponse,status_code=status.HTTP_201_CREATED,)
async def upload_document(
    workspace_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
    file: Annotated[UploadFile, File()],
):
    service = DocumentService(db)
    return await service.upload_document(
        workspace_id=workspace_id,
        user_id=current_user.id,
        file=file,
    )


@router.delete("/workspaces/documents/{document_id}",status_code=status.HTTP_204_NO_CONTENT,)
def delete_document(
    document_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    service = DocumentService(db)
    service.delete_document(
        document_id=document_id,
        user_id=current_user.id,
    )
    return None
