import "server-only";
import { z } from "zod";
import { createInquiry } from "@/server/repositories/inquiries.repo";
import type { InquiryPayload } from "@/types";

const phoneRegex = /^[+]?[\d\s\-()]{7,16}$/;

/** Server-side validation of an incoming inquiry (authoritative). */
export const inquiryInputSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex),
  whatsapp: z.string().regex(phoneRegex).optional().or(z.literal("")),
  destination: z.string().max(160).optional(),
  travelDate: z.string().max(40).optional(),
  travelers: z.number().int().min(1).max(60).optional(),
  budget: z.string().max(80).optional(),
  message: z.string().max(1200).optional(),
  source: z.enum(["package", "car", "destination", "contact", "general"]),
  referenceId: z.string().max(80).optional(),
  referenceTitle: z.string().max(240).optional(),
  // Honeypot — must be empty.
  company: z.string().max(0).optional(),
});

export type InquiryServiceResult =
  | { ok: true; id: string; createdAt: string }
  | { ok: false; error: string; issues?: z.ZodIssue[] };

export async function submitInquiry(input: unknown): Promise<InquiryServiceResult> {
  const parsed = inquiryInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Validation failed", issues: parsed.error.issues };
  }

  // Honeypot tripped — pretend success, persist nothing.
  if (parsed.data.company) {
    return { ok: true, id: "ignored", createdAt: new Date().toISOString() };
  }

  const { company: _company, ...payload } = parsed.data;
  void _company;

  const result = await createInquiry(payload as InquiryPayload);

  // TODO: dispatch notification (email/WhatsApp) to the sales team here.

  return { ok: true, id: result.id, createdAt: result.createdAt };
}
