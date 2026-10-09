interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this information",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-destructive/20  bg-destructive/5 p-8 text-center">
      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 text-sm font-medium underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
