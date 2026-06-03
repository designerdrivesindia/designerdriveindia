"use client";

import { useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Package } from "@/types";
import { usePackageFilters } from "@/store/filter-store";
import { PackageCard } from "@/components/cards/package-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/field";
import { PlanTripButton } from "@/components/inquiry/plan-trip-button";
import { COUNTRIES, TRIP_TYPES, PACKAGE_SORTS, BUDGET_RANGES } from "@/lib/constants";

const DURATIONS = [
  { value: "1-4", label: "Up to 4 days" },
  { value: "5-7", label: "5 – 7 days" },
  { value: "8+", label: "8 days +" },
];

function inBudget(price: number, bucket: string | null) {
  switch (bucket) {
    case "under-25k": return price < 25000;
    case "25k-50k": return price >= 25000 && price <= 50000;
    case "50k-100k": return price > 50000 && price <= 100000;
    case "100k-plus": return price > 100000;
    default: return true;
  }
}

function inDuration(days: number, bucket: string | null) {
  switch (bucket) {
    case "1-4": return days <= 4;
    case "5-7": return days >= 5 && days <= 7;
    case "8+": return days >= 8;
    default: return true;
  }
}

export function PackageExplorer({ packages }: { packages: Package[] }) {
  const f = usePackageFilters();

  const results = useMemo(() => {
    let list = packages.filter((p) => {
      if (f.country && p.country !== f.country) return false;
      if (f.tripType && !p.tripTypes.includes(f.tripType as never)) return false;
      if (!inBudget(p.startingPrice, f.budget)) return false;
      if (!inDuration(p.durationDays, f.duration)) return false;
      if (f.search) {
        const q = f.search.toLowerCase();
        if (!`${p.title} ${p.state} ${p.country} ${p.summary}`.toLowerCase().includes(q))
          return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (f.sort) {
        case "price-asc": return a.startingPrice - b.startingPrice;
        case "price-desc": return b.startingPrice - a.startingPrice;
        case "duration": return b.durationDays - a.durationDays;
        case "latest": return +new Date(b.createdAt) - +new Date(a.createdAt);
        default: return b.popularity - a.popularity;
      }
    });
    return list;
  }, [packages, f.country, f.tripType, f.budget, f.duration, f.search, f.sort]);

  const activeCount = [f.country, f.tripType, f.budget, f.duration].filter(Boolean).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filters sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-line bg-paper p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-heading text-lg text-ink">
              <SlidersHorizontal className="size-4 text-gold-deep" /> Filters
            </h2>
            {activeCount > 0 && (
              <button onClick={f.reset} className="text-xs font-medium text-gold-deep hover:underline">
                Clear ({activeCount})
              </button>
            )}
          </div>

          <div className="mt-5 space-y-4">
            <Filter label="Search">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
                <Input
                  value={f.search}
                  onChange={(e) => f.setFilter("search", e.target.value)}
                  placeholder="Destination or keyword"
                  className="pl-9"
                />
              </div>
            </Filter>
            <Filter label="Country">
              <Select value={f.country ?? ""} onChange={(e) => f.setFilter("country", e.target.value || null)}>
                <option value="">All countries</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            </Filter>
            <Filter label="Trip type">
              <Select value={f.tripType ?? ""} onChange={(e) => f.setFilter("tripType", e.target.value || null)}>
                <option value="">Any type</option>
                {TRIP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </Filter>
            <Filter label="Duration">
              <Select value={f.duration ?? ""} onChange={(e) => f.setFilter("duration", e.target.value || null)}>
                <option value="">Any length</option>
                {DURATIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </Select>
            </Filter>
            <Filter label="Budget">
              <Select value={f.budget ?? ""} onChange={(e) => f.setFilter("budget", e.target.value || null)}>
                <option value="">Any budget</option>
                {BUDGET_RANGES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
              </Select>
            </Filter>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-ink p-5 text-cream">
          <p className="font-heading text-lg">Can&apos;t find the right fit?</p>
          <p className="mt-1 text-sm text-cream/70">We design fully custom itineraries.</p>
          <PlanTripButton variant="gold" size="sm" className="mt-4 w-full" source="package">
            Plan a Custom Trip
          </PlanTripButton>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "package" : "packages"}
          </p>
          <label className="flex items-center gap-2 text-sm text-ink-muted">
            Sort by
            <Select
              value={f.sort}
              onChange={(e) => f.setFilter("sort", e.target.value as typeof f.sort)}
              className="w-auto py-2"
            >
              {PACKAGE_SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </Select>
          </label>
        </div>

        {results.length === 0 ? (
          <EmptyState action={<Button variant="outline" onClick={f.reset}>Reset filters</Button>} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
      {children}
    </div>
  );
}
