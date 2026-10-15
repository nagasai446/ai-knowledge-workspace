import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from "../api/document-api";

export const documentKeys = {
  all: ["documents"] as const,

  workspace: (workspaceId: number) =>
    ["documents", "workspace", workspaceId] as const,
};

export function useDocuments(workspaceId: number) {
  return useQuery({
    queryKey: documentKeys.workspace(workspaceId),
    queryFn: () => getDocuments(workspaceId),
    enabled: Number.isInteger(workspaceId) && workspaceId > 0,
  });
}

export function useUploadDocument(workspaceId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadDocument(workspaceId, file),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: documentKeys.workspace(workspaceId),
      });
    },
  });
}

export function useDeleteDocument(workspaceId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: number) => deleteDocument(documentId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: documentKeys.workspace(workspaceId),
      });
    },
  });
}
