"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUSES = ["all", "new", "contacted", "negotiation", "converted", "closed"] as const;

export function InquiryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("status") ?? "all";

  function setStatus(status: string) {
    const next = new URLSearchParams(params.toString());
    if (status === "all") next.delete("status");
    else next.set("status", status);
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
  }

  const exportHref = `/api/admin/inquiries/export${
    active !== "all" ? `?status=${active}` : ""
  }`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm capitalize transition-colors",
              active === s
                ? "border-ink bg-ink text-cream"
                : "border-line-strong text-ink-soft hover:border-ink",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <a
        href={exportHref}
        className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
      >
        <Download className="size-4" /> Export CSV
      </a>
    </div>
  );
}
