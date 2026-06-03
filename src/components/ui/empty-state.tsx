import { SearchX } from "lucide-react";

export function EmptyState({
  title = "Nothing matches your filters",
  description = "Try widening your search — or let us plan something bespoke for you.",
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line-strong bg-paper/50 px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-sand text-gold-deep">
        <SearchX className="size-6" />
      </span>
      <h3 className="mt-5 font-heading text-2xl text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
