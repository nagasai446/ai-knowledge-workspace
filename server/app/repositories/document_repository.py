from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.workspace import Workspace

class DocumentRepository:
    
    def __init__(self,db:Session):
        self.db=db

    def get_owned_workspace(self,workspace_id:int,user_id:int)->Workspace | None:
        statement =select(Workspace).where(Workspace.id==workspace_id,Workspace.owner_id==user_id)

        return self.db.scalar(statement)

    def list_for_workspace(self,workspace_id:int)->list[Document]:
        statement = select(Document).where(Document.workspace_id==workspace_id).order_by(Document.created_at.desc())

        return list(self.db.scalars(statement).all())

    def get_for_owner(self,document_id:int,user_id:int)->Document |None:
        statement = (select(Document).join(Workspace,Document.workspace_id==Workspace.id).where(Document.id==document_id,Workspace.owner_id==user_id))

        return self.db.scalar(statement)

    def create(self,document:Document)->Document:
        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)
        return document

    def delete(self,document:Document)->None:
        self.db.delete(document)
        self.db.commit()