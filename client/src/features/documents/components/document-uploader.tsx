import { useRef, useState } from "react";
import type { ChangeEvent } from "react";

import { FileUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUploadDocument } from "../hooks/use-documents";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt"];

interface DocumentUploderProps {
  workspaceId: number;
}

export function DocumentUploader({ workspaceId }: DocumentUploderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const mutation = useUploadDocument(workspaceId);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    // allow selecting the same file agin after a failed upload

    event.target.value = "";

    if (!file) return;

    setError(null);

    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setError("Choose a PDF, DOCX, or TXT File.");

      return;
    }

    if (file.size === 0) {
      setError("Empty Files cannot be uploaded");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("The Maximum file size is 10mb");
      return;
    }

    try {
      await mutation.mutateAsync(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to Upload file");
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={handleFileChange}
        disabled={mutation.isPending}
      />

      <Button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={mutation.isPending}
      >
        <FileUp className="mr-2 h-4 w-4" />
        {mutation.isPending ? "Uploading..." : "Upload document"}
      </Button>

      <p className="text-sm text-muted-foreground">
        PDF, DOCX, or TXT. Maximum size : 10 MB.
      </p>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
