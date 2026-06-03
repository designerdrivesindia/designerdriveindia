"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const icons = {
  default: Info,
  success: CheckCircle2,
  error: AlertCircle,
} as const;

export function Toaster() {
  const toasts = useUIStore((s) => s.toasts);
  const dismiss = useUIStore((s) => s.dismissToast);

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((t) => {
        const Icon = icons[t.variant];
        return (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-md border bg-paper p-4 shadow-[var(--shadow-lift)] animate-in",
              t.variant === "success" && "border-success/30",
              t.variant === "error" && "border-danger/30",
              t.variant === "default" && "border-line",
            )}
          >
            <Icon
              className={cn(
                "mt-0.5 size-5 shrink-0",
                t.variant === "success" && "text-success",
                t.variant === "error" && "text-danger",
                t.variant === "default" && "text-gold-deep",
              )}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 text-sm text-ink-muted">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="text-ink-muted transition-colors hover:text-ink"
              aria-label="Dismiss notification"
            >
              <X className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
