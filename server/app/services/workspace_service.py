from sqlalchemy.orm import Session

from app.models.workspace import Workspace
from app.repositories.workspace_repository import WorkspaceRepository


class WorkspaceService:


    @staticmethod
    def create(db:Session, owner_id:int, name:str, description:str |None)->Workspace:
        workspace = Workspace(name=name, description=description, owner_id=owner_id)

        return WorkspaceRepository.create(db,workspace)

    @staticmethod
    def get_all(db:Session,owner_id:int)->list[Workspace]:

        return WorkspaceRepository.get_all_by_owner(db,owner_id)

    @staticmethod
    def get_one(db:Session,workspace_id:int,owner_id:int)->Workspace | None:

        return WorkspaceRepository.get_by_id_and_owner(db,workspace_id,owner_id)

    @staticmethod
    def update(db:Session,workspace:Workspace,name:str|None,description:str|None)->Workspace:
        
        if name is not None:
            workspace.name=name

        if description is not None:
            workspace.description=description

        return WorkspaceRepository.update(db,workspace)

    @staticmethod
    def delete(db:Session,workspace:Workspace)->None:

        WorkspaceRepository.delete(db,workspace)