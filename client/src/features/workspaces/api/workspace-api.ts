import { apiRequest } from "@/lib/app-client";

import type {
  CreateWorkspaceRequest,
  UpdatedWorkspaceRequest,
  Workspace,
} from "../workspace-types";

export function getWorkspaces() {
  return apiRequest("/api/v1/workspaces") as Promise<Workspace[]>;
}

export function getWorkspace(id: number) {
  return apiRequest(`/api/v1/workspaces/${id}`) as Promise<Workspace>;
}

export function createWorkspace(data: CreateWorkspaceRequest) {
  return apiRequest("/api/v1/workspaces", {
    method: "POST",
    body: JSON.stringify(data),
  }) as Promise<Workspace>;
}


export function updateWorkspace(id: number, data: UpdatedWorkspaceRequest) {
  return apiRequest(`/api/v1/workspaces/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
  }) as Promise<Workspace>;
}

export function deleteWorkspace(id: number) {
  return apiRequest(`/api/v1/workspaces/${id}`, {
    method: "DELETE",
  });
}
