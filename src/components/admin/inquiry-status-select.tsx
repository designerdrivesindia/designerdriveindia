"use client";

import { useState, useTransition } from "react";
import { updateInquiryStatusAction } from "@/server/actions/inquiries.actions";
import type { InquiryStatus } from "@/server/repositories/inquiries.repo";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const STATUSES: InquiryStatus[] = ["new", "contacted", "negotiation", "converted", "closed"];

export function InquiryStatusSelect({
  id,
  status,
  className,
}: {
  id: string;
  status: InquiryStatus;
  className?: string;
}) {
  const [value, setValue] = useState<InquiryStatus>(status);
  const [pending, startTransition] = useTransition();
  const toast = useUIStore((s) => s.toast);

  function change(next: InquiryStatus) {
    const prev = value;
    setValue(next);
    startTransition(async () => {
      const res = await updateInquiryStatusAction(id, next);
      if (!res.ok) {
        setValue(prev);
        toast({ variant: "error", title: "Could not update status", description: res.error });
      } else {
        toast({ variant: "success", title: `Marked as ${next}` });
      }
    });
  }

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => change(e.target.value as InquiryStatus)}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "rounded-full border border-line-strong bg-paper px-3 py-1 text-xs font-medium capitalize text-ink focus:border-gold focus:outline-none disabled:opacity-60",
        className,
      )}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
