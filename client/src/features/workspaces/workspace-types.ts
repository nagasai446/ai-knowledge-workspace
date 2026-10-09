export interface Workspace {
  id: number;
  name: string;
  description: string | null;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
}

export interface UpdatedWorkspaceRequest {
  name?: string;
  description?: string;
}
