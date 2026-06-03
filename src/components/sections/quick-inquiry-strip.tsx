"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { quickInquirySchema, type QuickInquiryValues } from "@/lib/validations";
import { Select, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";
import { destinations } from "@/data";
import { BUDGET_RANGES, TRAVELLER_OPTIONS } from "@/lib/constants";

/**
 * Hero quick-inquiry strip. Pre-fills and opens the full inquiry modal so the
 * lead is captured with all context — the primary top-of-funnel CTA.
 */
export function QuickInquiryStrip() {
  const openModal = useUIStore((s) => s.openInquiryModal);
  const { register, handleSubmit } = useForm<QuickInquiryValues>({
    resolver: zodResolver(quickInquirySchema),
    defaultValues: { destination: "" },
  });

  const onSubmit = handleSubmit((values) => {
    openModal({
      source: "general",
      title: values.destination
        ? `Trip to ${values.destination}`
        : undefined,
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-3 rounded-xl border border-line bg-paper/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:items-end md:gap-4 md:p-5"
    >
      <Field label="Destination">
        <Select aria-label="Destination" {...register("destination")}>
          <option value="">Where to?</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </Select>
      </Field>
      <Field label="Travel date">
        <Input type="date" aria-label="Travel date" {...register("travelDate")} />
      </Field>
      <Field label="Travellers">
        <Select aria-label="Travellers" {...register("travelers")}>
          <option value="">Any</option>
          {TRAVELLER_OPTIONS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
      </Field>
      <Field label="Budget">
        <Select aria-label="Budget" {...register("budget")}>
          <option value="">Any</option>
          {BUDGET_RANGES.map((b) => (
            <option key={b.value} value={b.label}>{b.label}</option>
          ))}
        </Select>
      </Field>
      <Button type="submit" variant="gold" size="lg" className="md:h-13">
        <Search className="size-4" /> Enquire
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
      {children}
    </label>
  );
}
