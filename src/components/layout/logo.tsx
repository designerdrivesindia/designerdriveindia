import Link from "next/link";
import { cn } from "@/lib/utils";

/** Wordmark logo — Cormorant serif with a gold accent rule. */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" aria-label="Designer Drives India — home" className="group flex flex-col leading-none">
      <span
        className={cn(
          "font-heading text-xl font-semibold tracking-tight transition-colors md:text-2xl",
          dark ? "text-cream" : "text-ink",
        )}
      >
        Designer Drives
      </span>
      <span className="mt-0.5 flex items-center gap-1.5">
        <span className="h-px w-5 bg-gold transition-all group-hover:w-7" />
        <span
          className={cn(
            "text-[0.6rem] font-semibold uppercase tracking-[0.3em]",
            dark ? "text-cream/70" : "text-gold-deep",
          )}
        >
          India
        </span>
      </span>
    </Link>
  );
}
