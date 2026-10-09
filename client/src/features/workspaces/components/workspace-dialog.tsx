import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateWorkspace } from "../hooks/use-workspaces";
import {
  workspaceSchema,
  type WorkspaceFormValues,
} from "../schemas/workspace-schema";

export function WorkspaceDialog() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateWorkspace();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      reset();
    }
  }

  function onSubmit(data: WorkspaceFormValues) {
    mutation.mutate(
      {
        name: data.name.trim(),
        description: data.description?.trim() || undefined,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
        onError: (error) => {
          setError("root", {
            message:
              error instanceof Error
                ? error.message
                : "Unable to create workspace. Please try again.",
          });
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90">
        <Plus className="mr-2 h-4 w-4" />
        New workspace
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-2">
            <label htmlFor="workspace-name" className="text-sm font-medium">
              Name
            </label>

            <Input
              id="workspace-name"
              placeholder="AI Engineering"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="workspace-description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <Textarea
              id="workspace-description"
              placeholder="What is this workspace for?"
              aria-invalid={Boolean(errors.description)}
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p role="alert" className="text-sm text-destructive">
              {errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create workspace"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
