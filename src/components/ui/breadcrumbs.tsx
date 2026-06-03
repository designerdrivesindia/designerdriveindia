import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: { name: string; path?: string }[];
  light?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${light ? "text-cream/70" : "text-ink-muted"}`}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.path && !last ? (
                <Link
                  href={item.path}
                  className={`transition-colors ${light ? "hover:text-cream" : "hover:text-ink"}`}
                >
                  {item.name}
                </Link>
              ) : (
                <span className={last ? (light ? "text-cream" : "text-ink") : undefined} aria-current={last ? "page" : undefined}>
                  {item.name}
                </span>
              )}
              {!last && <ChevronRight className="size-3.5 opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
