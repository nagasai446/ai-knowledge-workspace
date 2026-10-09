import { z } from "zod";

export const workspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Workspace name is required")
    .max(150, "Workspace name cannot exceed 150 characters"),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

export type WorkspaceFormValues = z.infer<
  typeof workspaceSchema
>;