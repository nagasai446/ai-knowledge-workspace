import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WorkspaceState{
    activeWorkspaceId : number | null;
}

const initialState: WorkspaceState={
    activeWorkspaceId:null
}

const workspaceSlice = createSlice({
    name : "workspace",

    initialState,

    reducers:{
        setActiveWorkspace(
            state,
            action:PayloadAction<number>,
        ){
            state.activeWorkspaceId=action.payload
        },

        clearActiveWorkspace(state){
            state.activeWorkspaceId=null;
        }
    }
});

export const {setActiveWorkspace, clearActiveWorkspace} = workspaceSlice.actions;

export default workspaceSlice.reducer