"use client";

import { useMutation } from "@tanstack/react-query";
import { submitInquiry } from "@/services/inquiry-service";
import { useUIStore } from "@/store/ui-store";
import type { InquiryPayload } from "@/types";

/** Submit-inquiry mutation wired to toast notifications. */
export function useInquiry(onDone?: () => void) {
  const toast = useUIStore((s) => s.toast);

  return useMutation({
    mutationFn: (payload: InquiryPayload) => submitInquiry(payload),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Inquiry received",
        description:
          "Thank you — a travel specialist will reach out within 24 hours.",
      });
      onDone?.();
    },
    onError: () => {
      toast({
        variant: "error",
        title: "Something went wrong",
        description: "Please try again, or reach us on WhatsApp.",
      });
    },
  });
}
