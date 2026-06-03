"use client";

import { useMemo, useState } from "react";
import type { Car } from "@/types";
import { CarCard } from "@/components/cards/car-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Select } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { CAR_CATEGORIES } from "@/lib/constants";

export function CarExplorer({ cars }: { cars: Car[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [minSeats, setMinSeats] = useState<string>("");
  const [ac, setAc] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const cities = useMemo(
    () => Array.from(new Set(cars.flatMap((c) => c.cities))).sort(),
    [cars],
  );

  const results = useMemo(
    () =>
      cars.filter((c) => {
        if (category && c.category !== category) return false;
        if (minSeats && c.seats < Number(minSeats)) return false;
        if (ac === "ac" && !c.ac) return false;
        if (ac === "non-ac" && c.ac) return false;
        if (city && !c.cities.includes(city)) return false;
        return true;
      }),
    [cars, category, minSeats, ac, city],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-6">
        <button
          onClick={() => setCategory(null)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
            category === null ? "border-ink bg-ink text-cream" : "border-line-strong text-ink-soft hover:border-ink",
          )}
        >
          All vehicles
        </button>
        {CAR_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              category === cat ? "border-ink bg-ink text-cream" : "border-line-strong text-ink-soft hover:border-ink",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Select value={minSeats} onChange={(e) => setMinSeats(e.target.value)} aria-label="Minimum seats">
          <option value="">Any seats</option>
          <option value="4">4+ seats</option>
          <option value="7">7+ seats</option>
          <option value="12">12+ seats</option>
        </Select>
        <Select value={ac} onChange={(e) => setAc(e.target.value)} aria-label="AC preference">
          <option value="">AC or non-AC</option>
          <option value="ac">AC</option>
          <option value="non-ac">Non-AC</option>
        </Select>
        <Select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City" className="col-span-2 sm:col-span-1">
          <option value="">Any city</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
        <p className="col-span-2 flex items-center text-sm text-ink-muted sm:col-span-1 sm:justify-end">
          <span className="font-semibold text-ink">{results.length}</span>&nbsp;vehicles
        </p>
      </div>

      {results.length === 0 ? (
        <div className="mt-8">
          <EmptyState description="No vehicles match those filters." />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => <CarCard key={c.id} car={c} />)}
        </div>
      )}
    </div>
  );
}
