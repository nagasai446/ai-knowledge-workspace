
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, FolderOpen } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ErrorState } from "@/components/common/error-state";
// import { LoadingState } from "@/components/common/loading-state";

// import { DocumentUploader } from "@/features/documents/components/document-uploader";
// import { DocumentList } from "@/features/documents/components/document-list";

// import { useWorkspace } from "../hooks/use-workspaces";

// export function WorkspacePage() {
//   const { workspaceId: workspaceIdParam } = useParams();

//   const workspaceId = Number(workspaceIdParam);

//   const isValidWorkspaceId =
//     Boolean(workspaceIdParam) &&
//     Number.isInteger(workspaceId) &&
//     workspaceId > 0;

//   const {
//     data: workspace,
//     isLoading,
//     isError,
//     refetch,
//   } = useWorkspace(workspaceId);

//   if (!isValidWorkspaceId) {
//     return (
//       <div className="p-6">
//         <ErrorState />
//       </div>
//     );
//   }

//   if (isLoading) {
//     return <LoadingState />;
//   }

//   if (isError || !workspace) {
//     return (
//       <div className="space-y-4 p-6">
//         <ErrorState onRetry={() => refetch()} />

//         <Button variant="outline">
//           <Link to="/workspaces">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to workspaces
//           </Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
//       <div>
//         <Button variant="ghost"  className="-ml-3 mb-4">
//           <Link to="/workspaces">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to workspaces
//           </Link>
//         </Button>

//         <div className="flex items-start gap-4">
//           <div className="rounded-xl bg-primary/10 p-3">
//             <FolderOpen className="h-6 w-6 text-primary" />
//           </div>

//           <div className="min-w-0 flex-1">
//             <h1 className="text-3xl font-semibold tracking-tight">
//               {workspace.name}
//             </h1>

//             <p className="mt-2 text-muted-foreground">
//               {workspace.description || "Manage documents in this workspace."}
//             </p>
//           </div>
//         </div>
//       </div>

//       <Card className="space-y-5 p-6">
//         <div>
//           <h2 className="text-xl font-semibold">Upload documents</h2>

//           <p className="mt-1 text-sm text-muted-foreground">
//             Add PDF, DOCX, or TXT files to this workspace.
//           </p>
//         </div>

//         <DocumentUploader workspaceId={workspaceId} />
//       </Card>

//       <section className="space-y-4">
//         <div>
//           <h2 className="text-xl font-semibold">Your documents</h2>

//           <p className="mt-1 text-sm text-muted-foreground">
//             View and manage the files associated with this workspace.
//           </p>
//         </div>

//         <DocumentList workspaceId={workspaceId} />
//       </section>
//     </div>
//   );
// }


import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FolderOpen } from "lucide-react";

import {
  buttonVariants,
} from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";

import { DocumentUploader } from "@/features/documents/components/document-uploader";
import { DocumentList } from "@/features/documents/components/document-list";

import { useWorkspace } from "../hooks/use-workspaces";

export function WorkspacePage() {
  const { workspaceId: workspaceIdParam } = useParams();

  const workspaceId = Number(workspaceIdParam);

  const isValidWorkspaceId =
    Boolean(workspaceIdParam) &&
    Number.isInteger(workspaceId) &&
    workspaceId > 0;

  const {
    data: workspace,
    isLoading,
    isError,
    refetch,
  } = useWorkspace(workspaceId);

  if (!isValidWorkspaceId) {
    return (
      <div className="p-6">
        <ErrorState />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !workspace) {
    return (
      <div className="space-y-4 p-6">
        <ErrorState onRetry={() => refetch()} />

        <Link
          to="/workspaces"
          className={buttonVariants({ variant: "outline" })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to workspaces
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <div>
        <Link
          to="/workspaces"
          className={buttonVariants({
            variant: "ghost",
            className: "-ml-3 mb-4",
          })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to workspaces
        </Link>

        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-primary/10 p-3">
            <FolderOpen className="h-6 w-6 text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              {workspace.name}
            </h1>

            <p className="mt-2 text-muted-foreground">
              {workspace.description ||
                "Manage documents in this workspace."}
            </p>
          </div>
        </div>
      </div>

      <Card className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-semibold">
            Upload documents
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add PDF, DOCX, or TXT files to this workspace.
          </p>
        </div>

        <DocumentUploader workspaceId={workspaceId} />
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            Your documents
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            View and manage the files associated with this workspace.
          </p>
        </div>

        <DocumentList workspaceId={workspaceId} />
      </section>
    </div>
  );
}

