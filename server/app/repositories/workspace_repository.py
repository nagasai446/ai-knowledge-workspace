from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.workspace import Workspace


class WorkspaceRepository:

    @staticmethod
    def create(db:Session,workspace:Workspace)->Workspace:
        db.add(workspace)
        db.commit()
        db.refresh(workspace)

        return workspace

    @staticmethod
    def get_by_id(db:Session,workspace_id:int)->Workspace |None:
        statement = select(Workspace).where(Workspace.id == workspace_id)

        return db.scalar(statement)

    @staticmethod
    def get_by_id_and_owner(db:Session,workspace_id:int,owner_id:int)->Workspace |None:
        statement = select(Workspace).where(Workspace.id == workspace_id, Workspace.owner_id == owner_id)

        return db.scalar(statement)

    @staticmethod
    def get_all_by_owner(db:Session,owner_id:int)->list[Workspace]:
        statement = select(Workspace).where(Workspace.owner_id == owner_id).order_by(Workspace.created_at.desc())

        return list(db.scalars(statement).all())

    @staticmethod
    def update(db:Session,workspace:Workspace)->Workspace:
        db.commit()
        db.refresh(workspace)

        return workspace

    @staticmethod
    def delete(db:Session,workspace:Workspace)->None:
        db.delete(workspace)
        db.commit()