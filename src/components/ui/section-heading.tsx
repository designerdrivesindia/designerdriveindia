import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** Standard section header: eyebrow + serif title + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="gold-rule" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2
        className={cn(
          "text-3xl leading-tight md:text-4xl lg:text-[2.75rem]",
          light ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-cream/70" : "text-ink-muted",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
