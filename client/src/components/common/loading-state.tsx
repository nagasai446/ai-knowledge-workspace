export function LoadingState() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-40 animate-pulse rounded-xl border bg-muted/40"
        />
      ))}
    </div>
  );
}
