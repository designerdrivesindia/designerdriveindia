import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  reviewCount,
  className,
  size = 14,
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={
              i < Math.round(rating)
                ? "fill-gold text-gold"
                : "fill-line text-line"
            }
          />
        ))}
      </div>
      <span className="text-sm font-medium text-ink">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-sm text-ink-muted">({reviewCount})</span>
      )}
    </div>
  );
}
