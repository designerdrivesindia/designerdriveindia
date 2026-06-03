import { cn } from "@/lib/utils";

/** Horizontal bar list — lightweight, dependency-free. */
export function BarList({
  data,
  className,
}: {
  data: { label: string; value: number; color?: string }[];
  className?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className={cn("space-y-3", className)}>
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="capitalize text-ink-soft">{d.label}</span>
            <span className="font-medium text-ink">{d.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sand">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: d.color ?? "var(--color-gold)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Donut chart from segments, rendered with stroke-dasharray. */
export function Donut({
  segments,
  size = 160,
  thickness = 20,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  // Precompute each segment's arc length and cumulative start offset (immutably).
  const lengths = segments.map((seg) => (seg.value / total) * circumference);
  const arcs = segments.map((seg, i) => ({
    ...seg,
    length: lengths[i],
    start: lengths.slice(0, i).reduce((a, b) => a + b, 0),
  }));

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-sand)" strokeWidth={thickness} />
        {arcs.map((seg) => (
          <circle
            key={seg.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${seg.length} ${circumference - seg.length}`}
            strokeDashoffset={-seg.start}
          />
        ))}
      </svg>
      <ul className="space-y-2">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="capitalize text-ink-soft">{seg.label}</span>
            <span className="ml-auto font-medium text-ink">{seg.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
