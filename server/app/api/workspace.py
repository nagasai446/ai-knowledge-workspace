from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.workspace import (WorkspaceCreate, WorkspaceResponse, WorkspaceUpdate)
from app.services.workspace_service import WorkspaceService

router =APIRouter(prefix="/api/v1/workspaces",tags=["workspaces"])


@router.post("",response_model=WorkspaceResponse,status_code=status.HTTP_201_CREATED)
async def create_workspace(data:WorkspaceCreate, current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):

    workspace=WorkspaceService.create(db=db, owner_id=current_user.id, name=data.name, description=data.description)

    return workspace


@router.get("",response_model=list[WorkspaceResponse])
async def get_workspaces(current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):


    return WorkspaceService.get_all(db=db,owner_id=current_user.id)


@router.get("/{workspace_id}",response_model=WorkspaceResponse)
async def get_workspace(workspace_id:int, current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):

    workspace=WorkspaceService.get_one(db=db,workspace_id=workspace_id, owner_id=current_user.id)

    if not workspace:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Workspace not found",)

    return workspace


@router.patch("/{workspace_id}",response_model=WorkspaceResponse,)
async def update_workspace(workspace_id: int,data: WorkspaceUpdate,current_user: User = Depends(get_current_user),db: Session = Depends(get_db),):

    workspace = WorkspaceService.get_one(db=db,workspace_id=workspace_id,owner_id=current_user.id,)

    if not workspace:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Workspace not found",)

    return WorkspaceService.update(db=db,workspace=workspace,name=data.name,description=data.description,)

@router.delete("/{workspace_id}",status_code=status.HTTP_204_NO_CONTENT,)
async def delete_workspace(workspace_id: int,current_user: User = Depends(get_current_user),db: Session = Depends(get_db),):

    workspace = WorkspaceService.get_one(db=db,workspace_id=workspace_id,owner_id=current_user.id,)

    if not workspace:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Workspace not found",)

    WorkspaceService.delete(db,workspace,)