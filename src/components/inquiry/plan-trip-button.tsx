"use client";

import { useUIStore } from "@/store/ui-store";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { InquirySource } from "@/types";

/** Button that opens the global inquiry modal with optional context. */
export function PlanTripButton({
  children = "Plan My Trip",
  source = "general",
  title,
  referenceId,
  ...props
}: ButtonProps & {
  source?: InquirySource;
  title?: string;
  referenceId?: string;
}) {
  const open = useUIStore((s) => s.openInquiryModal);
  return (
    <Button onClick={() => open({ source, title, referenceId })} {...props}>
      {children}
    </Button>
  );
}
