import { EmptyState } from "@/components/common/empty-state";

import type { Workspace } from "../workspace-types";
import { WorkspaceCard } from "./workspace-card";

interface WorkspaceListProps {
  workspaces: Workspace[];
}

export function WorkspaceList({ workspaces }: WorkspaceListProps) {
  if (!workspaces.length) {
    return (
      <EmptyState
        title="Create Your First Workspace"
        description="Workspaces help you organize documents, conversations and AI-powered knowledge."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
}
