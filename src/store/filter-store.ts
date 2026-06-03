"use client";

import { create } from "zustand";
import type { PackageSort } from "@/lib/constants";

interface PackageFilterState {
  country: string | null;
  tripType: string | null;
  duration: string | null;
  budget: string | null;
  sort: PackageSort;
  search: string;
  setFilter: <K extends keyof PackageFilterState>(
    key: K,
    value: PackageFilterState[K],
  ) => void;
  reset: () => void;
}

const initial = {
  country: null,
  tripType: null,
  duration: null,
  budget: null,
  sort: "popularity" as PackageSort,
  search: "",
};

export const usePackageFilters = create<PackageFilterState>((set) => ({
  ...initial,
  setFilter: (key, value) => set({ [key]: value } as Partial<PackageFilterState>),
  reset: () => set(initial),
}));
