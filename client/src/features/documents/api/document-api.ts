
import { apiRequest } from "@/lib/app-client";
import type { DocumentItem } from "../document-types";

export async function getDocuments(
  workspaceId: number,
): Promise<DocumentItem[]> {
  const result = await apiRequest(
    `/workspaces/${workspaceId}/documents`,
  );

  return result as DocumentItem[];
}

export async function uploadDocument(
  workspaceId: number,
  file: File,
): Promise<DocumentItem> {
  const formData = new FormData();
  formData.append("file", file);

  const result = await apiRequest(
    `/workspaces/${workspaceId}/documents`,
    {
      method: "POST",
      body: formData,
    },
  );

  return result as DocumentItem;
}

export async function deleteDocument(
  documentId: number,
): Promise<void> {
  await apiRequest(
    `/workspaces/documents/${documentId}`,
    {
      method: "DELETE",
    },
  );
}
