from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.models.document import Document
from app.repositories.document_repository import DocumentRepository

MAX_FILE_SIZE=10*1024*1024

ALLOWED_TYPES={
    ".pdf":{"application/pdf"},
    ".docx":{"application/vnd.openxmlformats-officedocument.""wordprocessingml.document"},
    ".txt":{"text/plain"},
}

# document_service.py is in server/app/services/.
# parents[2] resolves to the server directory.
SERVER_ROOT=Path(__file__).resolve().parents[2]
STORAGE_DIR=SERVER_ROOT/"storage"/"documents"

class DocumentService:

    def __init__(self,db:Session):
        self.db=db
        self.repository=DocumentRepository(db)

    def list_documents(self,workspace_id:int,user_id:int)->list[Document]:
        workspace=self.repository.get_owned_workspace(workspace_id,user_id)

        if workspace is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_Found,detail="Workspace not found")

        return self.repository.list_for_workspace(workspace_id)

    async def upload_document(self, workspace_id:int,user_id:int,file:UploadFile)->Document:
        workspace=self.repository.get_owned_workspace(workspace_id,user_id)

        if workspace is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Workspace not found")

        original_name=Path(file.filename or "").name
        extension = Path(original_name).suffix.lower()
        reported_type = file.content_type or ""

        if not original_name or extension not in ALLOWED_TYPES:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="File content type does not match the allowed type")

        # Read at most one byte beyond the limit so we can reject
        # oversized files without loading an unlimited file into memory.

        content = await file.read(MAX_FILE_SIZE + 1)

        if not content:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Empty files are not allowed")

        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,detail="Maximum file size is 10mb")

        STORAGE_DIR.mkdir(parents=True,exist_ok=True)

        stored_filename=f"{uuid4().hex}{extension}"
        destination = STORAGE_DIR/stored_filename

        document=Document(
            workspace_id=workspace_id,
            original_filename=original_name[:225],
            stored_filename=stored_filename,
            content_type=reported_type,
            size_bytes=len(content),
            status="uploaded",
        )

        try:
            # "xb" prevents accidentally overwriting an existing file.
            with destination.open("xb") as output:
                output.write(content)

            return self.repository.create(document)

        except Exception:
            destination.unlink(missing_ok=True)
            raise
        finally:
            await file.close()

    def delete_document(self, document_id:int,user_id:int)->None:
        document = self.repository.get_for_owner(document_id,user_id)

        if document is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_Found,detail="Document not found")

        stored_filename=document.stored_filename

        # Remove the database record first. if disk cleanup fails,
        # the file is orphaned and should be logged for cleanup.
        self.repository.delete(document)

        destination= STORAGE_DIR/stored_filename

        try:
            destination.unlink(missing_ok=True)

        except OSError:
            # Replace with your application's logger in production
            pass 