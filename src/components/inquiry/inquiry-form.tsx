"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { inquirySchema, type InquiryFormValues } from "@/lib/validations";
import { useInquiry } from "@/hooks/use-inquiry";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, FormField } from "@/components/ui/field";
import { BUDGET_RANGES } from "@/lib/constants";
import { destinations } from "@/data";
import type { InquirySource } from "@/types";

export function InquiryForm({
  source,
  referenceId,
  referenceTitle,
  defaultDestination,
  compact = false,
  onSuccess,
}: {
  source: InquirySource;
  referenceId?: string;
  referenceTitle?: string;
  defaultDestination?: string;
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      source,
      referenceId,
      referenceTitle,
      destination: defaultDestination ?? "",
      company: "",
    },
  });

  const mutation = useInquiry(() => {
    reset();
    onSuccess?.();
  });

  const onSubmit = handleSubmit((values) => {
    // Strip the honeypot and coerce travellers to a number for the API.
    const { company: _company, travelers, ...rest } = values;
    void _company;
    mutation.mutate({
      ...rest,
      travelers: travelers ? Number(travelers) : undefined,
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {referenceTitle && (
        <p className="rounded-md bg-sand px-3.5 py-2.5 text-sm text-ink-soft">
          Enquiring about{" "}
          <span className="font-semibold text-ink">{referenceTitle}</span>
        </p>
      )}

      <div className={compact ? "flex flex-col gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <FormField label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
          <Input id="fullName" placeholder="Your name" invalid={!!errors.fullName} {...register("fullName")} />
        </FormField>
        <FormField label="Phone" htmlFor="phone" required error={errors.phone?.message}>
          <Input id="phone" type="tel" placeholder="+91 ‌98765 43210" invalid={!!errors.phone} {...register("phone")} />
        </FormField>
        <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" placeholder="you@example.com" invalid={!!errors.email} {...register("email")} />
        </FormField>
        <FormField label="WhatsApp (optional)" htmlFor="whatsapp" error={errors.whatsapp?.message}>
          <Input id="whatsapp" type="tel" placeholder="If different from phone" invalid={!!errors.whatsapp} {...register("whatsapp")} />
        </FormField>
        <FormField label="Destination" htmlFor="destination" error={errors.destination?.message}>
          <Select id="destination" defaultValue={defaultDestination ?? ""} {...register("destination")}>
            <option value="">Where to?</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
            <option value="Multiple / Not sure">Multiple / Not sure</option>
          </Select>
        </FormField>
        <FormField label="Travel date" htmlFor="travelDate" error={errors.travelDate?.message}>
          <Input id="travelDate" type="date" {...register("travelDate")} />
        </FormField>
        <FormField label="Travellers" htmlFor="travelers" error={errors.travelers?.message}>
          <Input id="travelers" type="number" min={1} placeholder="2" invalid={!!errors.travelers} {...register("travelers")} />
        </FormField>
        <FormField label="Budget (per person)" htmlFor="budget" error={errors.budget?.message}>
          <Select id="budget" defaultValue="" {...register("budget")}>
            <option value="">Approximate budget</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b.value} value={b.label}>{b.label}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label="Message" htmlFor="message" error={errors.message?.message}>
        <Textarea id="message" placeholder="Tell us how you like to travel, any must-sees, occasions…" {...register("message")} />
      </FormField>

      {/* Honeypot — visually hidden, ignored by humans */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("company")}
      />

      <Button type="submit" variant="gold" size="lg" disabled={mutation.isPending} className="mt-1 w-full sm:w-auto">
        {mutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> Send Inquiry
          </>
        )}
      </Button>
      <p className="text-xs text-ink-muted">
        We respond within 24 hours. Your details are never shared — see our{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">privacy policy</a>.
      </p>
    </form>
  );
}
