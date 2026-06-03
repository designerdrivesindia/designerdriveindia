"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { StatusBadge, EmptyRow } from "@/components/admin/ui";
import { deleteEntity } from "@/server/actions/content.actions";
import { useUIStore } from "@/store/ui-store";
import type { EntityKey } from "@/lib/admin-entities";

export interface EntityRow {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  status?: string;
}

export function EntityTable({
  entity,
  rows,
}: {
  entity: EntityKey;
  rows: EntityRow[];
}) {
  const router = useRouter();
  const toast = useUIStore((s) => s.toast);
  const [pending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function remove(row: EntityRow) {
    if (!confirm(`Delete “${row.title}”? This cannot be undone.`)) return;
    setDeletingId(row.id);
    startTransition(async () => {
      const res = await deleteEntity(entity, row.id);
      setDeletingId(null);
      if (!res.ok) {
        toast({ variant: "error", title: "Could not delete", description: res.error });
      } else {
        toast({ variant: "success", title: "Deleted" });
        router.refresh();
      }
    });
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-line bg-paper">
        <EmptyRow>Nothing here yet. Create your first entry.</EmptyRow>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line bg-sand/50 text-xs uppercase tracking-wide text-ink-muted">
          <tr>
            <th className="px-5 py-3 font-semibold">Title</th>
            <th className="px-5 py-3 font-semibold">Details</th>
            <th className="px-5 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-sand/40">
              <td className="px-5 py-3">
                <Link href={`/admin/${entity}/${row.id}`} className="font-medium text-ink hover:text-gold-deep">
                  {row.title}
                </Link>
                {row.subtitle && <p className="text-xs text-ink-muted">{row.subtitle}</p>}
              </td>
              <td className="px-5 py-3 text-ink-muted">
                <div className="flex items-center gap-2">
                  {row.status && <StatusBadge status={row.status} />}
                  {row.meta && <span>{row.meta}</span>}
                </div>
              </td>
              <td className="px-5 py-3">
                <div className="flex justify-end gap-1">
                  <Link
                    href={`/admin/${entity}/${row.id}`}
                    className="flex size-8 items-center justify-center rounded-md text-ink-soft hover:bg-sand hover:text-ink"
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <button
                    onClick={() => remove(row)}
                    disabled={pending && deletingId === row.id}
                    className="flex size-8 items-center justify-center rounded-md text-danger hover:bg-danger/10"
                    aria-label="Delete"
                  >
                    {pending && deletingId === row.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
