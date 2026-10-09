import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createWorkspace, updateWorkspace, deleteWorkspace, getWorkspaces } from "../api/workspace-api";

import type { CreateWorkspaceRequest, UpdatedWorkspaceRequest } from "../workspace-types";

const WORKSPACE_QUERY_KEY = ["workspaces"];

export function useWorkspaces(){
    return useQuery({
        queryKey:WORKSPACE_QUERY_KEY,
        queryFn:getWorkspaces,
    })
};

export function useCreateWorkspace(){
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(data:CreateWorkspaceRequest)=> createWorkspace(data),

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:WORKSPACE_QUERY_KEY,
            })
        }
    })
}

export function useUpdateWorkspace(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:({
            id,
            data,

        }:{
            id: number;
            data: UpdatedWorkspaceRequest;
        }) => updateWorkspace(id, data),

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:WORKSPACE_QUERY_KEY,
            })
        }
    })
}

export function useDeleteWorkspace(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(id:number)=>deleteWorkspace(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:WORKSPACE_QUERY_KEY,
            })
        }
    })
}

