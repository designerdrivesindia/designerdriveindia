import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium",
  {
    variants: {
      variant: {
        solid: "bg-ink text-cream",
        gold: "bg-gold/15 text-gold-deep",
        sand: "bg-sand-deep text-ink-soft",
        outline: "border border-line-strong text-ink-soft",
        light: "bg-cream/15 text-cream backdrop-blur-sm",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[0.7rem]",
        md: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "sand", size: "md" },
  },
);

export function Badge({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
