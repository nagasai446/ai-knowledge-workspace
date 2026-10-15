
import { ArrowUpRight, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Workspace } from "@/features/workspaces/workspace-types";

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <Link
      to={`/workspaces/${workspace.id}`}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Open workspace ${workspace.name}`}
    >
      <Card className="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FolderKanban className="h-5 w-5 text-primary" />
          </div>

          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </CardHeader>

        <CardContent>
          <CardTitle className="line-clamp-1">
            {workspace.name}
          </CardTitle>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {workspace.description || "No description provided"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
