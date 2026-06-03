import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-heading text-2xl text-ink md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  className,
  children,
  title,
  action,
}: {
  className?: string;
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-xl border border-line bg-paper", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          {title && <h2 className="font-heading text-lg text-ink">{title}</h2>}
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  href,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start justify-between rounded-xl border border-line bg-paper p-5 transition-shadow hover:shadow-[var(--shadow-soft)]">
      <div>
        <p className="text-sm text-ink-muted">{label}</p>
        <p className="mt-1 font-heading text-3xl font-semibold text-ink">{value}</p>
        {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
      </div>
      {icon && (
        <span className="flex size-10 items-center justify-center rounded-lg bg-sand text-gold-deep">
          {icon}
        </span>
      )}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

const statusStyles: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  negotiation: "bg-purple-100 text-purple-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-zinc-200 text-zinc-600",
  draft: "bg-zinc-200 text-zinc-600",
  published: "bg-green-100 text-green-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status] ?? "bg-sand text-ink-soft",
      )}
    >
      {status}
    </span>
  );
}

export function EmptyRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm text-ink-muted">{children}</p>
    </div>
  );
}
