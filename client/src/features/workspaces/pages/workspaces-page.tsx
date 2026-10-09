import { ArrowRight, FileText, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ErrorState } from "@/components/common/error-state";

import { LoadingState } from "@/components/common/loading-state";

import { WorkspaceDialog } from "../components/workspace-dialog";
import { WorkspaceList } from "../components/workspace-list";
import { useWorkspaces } from "../hooks/use-workspaces";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function WorkspacesPage() {
  const { user } = useAuth();

  const {
    data: workspaces = [],
    isLoading,
    isError,
    refetch,
  } = useWorkspaces();

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <section>
        <p className="text-sm text-muted-foreground">Welcome back</p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Good to see you, {user?.email?.split("@")[0]}
        </h1>

        <p className="mt-2 text-muted-foreground">
          your knowledge is organized and ready to explore.
        </p>
      </section>

      <Card className="overflow-hidden border-primary/10 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="p-6 lg:p-8">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI Knowledge Assistant
          </div>

          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight">
            Ask questions across your knowledge base
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Upload documents and let your AI assistant find, summarize and
            explain the information you need
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="outline">Summarize my documents</Button>

            <Button variant="outline">Generate interview questions</Button>
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Your Workspaces</h2>

            <p className="text-sm text-muted-foreground">
              Organize your knowledge by project or topic
            </p>
          </div>

          <WorkspaceDialog />
        </div>

        {isLoading && <LoadingState />}

        {isError && <ErrorState onRetry={() => refetch()} />}

        {!isLoading && !isError && <WorkspaceList workspaces={workspaces} />}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-muted p-3">
              <FileText className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">Add documents</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Upload PDFs, DOCX and text files to build your knowledge base.
              </p>

              <Button variant="link" className="mt-2 px-0">
                Upload documents
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-muted p-3">
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-semibold">AI Assistant</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Ask questions and receive answers with source citations
              </p>

              <Button variant="link" className="mt-2 px-0">
                Open assistant
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
