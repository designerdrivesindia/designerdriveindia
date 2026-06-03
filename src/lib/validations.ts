import { z } from "zod";

const phoneRegex = /^[+]?[\d\s\-()]{7,16}$/;

export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Enter a valid phone number"),
  whatsapp: z
    .string()
    .regex(phoneRegex, "Enter a valid WhatsApp number")
    .optional()
    .or(z.literal("")),
  destination: z.string().optional(),
  travelDate: z.string().optional(),
  travelers: z
    .string()
    .optional()
    .refine(
      (v) => !v || (Number(v) >= 1 && Number(v) <= 60),
      "Enter between 1 and 60 travellers",
    ),
  budget: z.string().optional(),
  message: z.string().max(1200, "Message is too long").optional(),
  source: z.enum(["package", "car", "destination", "contact", "general"]),
  referenceId: z.string().optional(),
  referenceTitle: z.string().optional(),
  // Honeypot — must stay empty (bots fill it).
  company: z.string().max(0).optional(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export const quickInquirySchema = z.object({
  destination: z.string().min(1, "Choose a destination"),
  travelDate: z.string().optional(),
  travelers: z.string().optional(),
  budget: z.string().optional(),
});

export type QuickInquiryValues = z.infer<typeof quickInquirySchema>;
