"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { InquiryForm } from "./inquiry-form";
import type { InquirySource } from "@/types";

/** Global "Plan My Trip" modal, opened from any CTA via the UI store. */
export function InquiryModal() {
  const open = useUIStore((s) => s.inquiryModalOpen);
  const ctx = useUIStore((s) => s.inquiryContext);
  const close = useUIStore((s) => s.closeInquiryModal);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Plan your trip"
      onClick={close}
    >
      <div
        className="relative my-8 w-full max-w-2xl rounded-lg bg-cream p-6 shadow-[var(--shadow-lift)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <X className="size-5" />
        </button>
        <div className="mb-6 pr-8">
          <span className="eyebrow">Plan My Trip</span>
          <h2 className="mt-2 text-2xl md:text-3xl">Let&apos;s design your journey</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Share a few details and a travel specialist will craft a tailored
            itinerary — no obligation.
          </p>
        </div>
        <InquiryForm
          source={(ctx.source as InquirySource) ?? "general"}
          referenceId={ctx.referenceId}
          referenceTitle={ctx.title}
          onSuccess={close}
        />
      </div>
    </div>
  );
}
