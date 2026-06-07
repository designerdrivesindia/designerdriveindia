"use client";

import { useMemo, useState } from "react";
import type { Destination } from "@/types";
import { DestinationCard } from "@/components/cards/destination-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { COUNTRIES, SEASONS, TRIP_TYPES } from "@/lib/constants";

type FilterKey = "country" | "season" | "tripType";

export function DestinationExplorer({ destinations }: { destinations: Destination[] }) {
  const [country, setCountry] = useState<string | null>(null);
  const [season, setSeason] = useState<string | null>(null);
  const [tripType, setTripType] = useState<string | null>(null);

  const results = useMemo(
    () =>
      destinations.filter((d) => {
        if (country && d.country !== country) return false;
        if (season && !d.seasons.includes(season as never)) return false;
        if (tripType && !d.tripTypes.includes(tripType as never)) return false;
        return true;
      }),
    [destinations, country, season, tripType],
  );

  const reset = () => {
    setCountry(null);
    setSeason(null);
    setTripType(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-8">
        <Row label="Country" options={COUNTRIES} value={country} onChange={setCountry} />
        {/* <Row label="Season" options={SEASONS} value={season} onChange={setSeason} /> */}
        <Row label="Trip type" options={TRIP_TYPES} value={tripType} onChange={setTripType} />
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        <span className="font-semibold text-ink">{results.length}</span> destinations
      </p>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            description="No destinations match those filters yet."
            action={<button onClick={reset} className="text-sm font-semibold text-gold-deep hover:underline">Reset filters</button>}
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((d) => (
            <DestinationCard key={d.id} destination={d} className="aspect-[4/5]" />
          ))}
        </div>
      )}
    </div>
  );

  function Row<T extends string>({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: readonly T[];
    value: string | null;
    onChange: (v: string | null) => void;
  }) {
    void (label as FilterKey | string);
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 w-20 text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
        <Chip active={value === null} onClick={() => onChange(null)}>All</Chip>
        {options.map((o) => (
          <Chip key={o} active={value === o} onClick={() => onChange(o)}>{o}</Chip>
        ))}
      </div>
    );
  }
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-ink bg-ink text-cream"
          : "border-line-strong text-ink-soft hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}
