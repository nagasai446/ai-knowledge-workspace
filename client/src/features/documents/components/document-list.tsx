import { useState } from "react";

import { FileText, Trash2 } from "lucide-react";
import type { DocumentItem } from "../document-types";

import { Button } from "@/components/ui/button";

import { useDeleteDocument, useDocuments } from "../hooks/use-documents";

interface DocumentListProps {
  workspaceId: number;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)}KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function DocumentList({ workspaceId }: DocumentListProps) {
  const documentsQuery = useDocuments(workspaceId);

  const deleteMutation = useDeleteDocument(workspaceId);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDelete(documentId: number) {
    const confirmed = window.confirm("Delete this document permanently?");

    if (!confirmed) return;

    setDeleteError(null);

    try {
      await deleteMutation.mutateAsync(documentId);
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Unable to delete the document",
      );
    }
  }

  if (documentsQuery.isPending) {
    return (
      <p className="text-sm text-muted-foreground">Loading documents...</p>
    );
  }

  if (documentsQuery.isError) {
    return (
      <div className="space-y-2">
        <p role="alert" className="text-sm text-destructive">
          {documentsQuery.error instanceof Error
            ? documentsQuery.error.message
            : "Unable to load documents"}
        </p>
        <Button variant="outline" onClick={() => documentsQuery.refetch()}>
          Try again
        </Button>
      </div>
    );
  }

const documents: DocumentItem[] =
  documentsQuery.data ?? [];



  return (
    <div className="space-y-3">
      {deleteError && (
        <p role="alert" className="text-sm text-destructive">
          {deleteError}
        </p>
      )}

      {documents.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <FileText className="mx-auto mb-3 h-8 text-muted-foreground" />
          <p className="font-medium">No documents</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a document to add it to this workspace.
          </p>
        </div>
      ) : (
        <ul className="divide-y rounded-lg border">
          {documents.map((document) => (
            <li key={document.id} className="flex items-center gap-3 p-4">
              <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {document.original_filename}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(document.size_bytes)}
                  {" . "}
                  {document.status}
                  {" . "}
                  {new Date(document.created_at).toLocaleDateString()}
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Delete ${document.original_filename}`}
                title="Delete Document"
                disabled={deleteMutation.isPending}
                onClick={() => handleDelete(document.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
