import type { CarCategory, Country, Season, TripType } from "@/types";

export const COUNTRIES: Country[] = ["India", "Nepal", "Bhutan", "Sri Lanka", "Dubai", "Thailand", "Maldives"];

export const TRIP_TYPES: TripType[] = [
  "Honeymoon",
  "Family",
  "Adventure",
  "Luxury",
  "Pilgrimage",
  "Wildlife",
  "Group Tour",
  "Student college Tour",
  "Education Tour",
];

export const SEASONS: Season[] = [
  "Spring",
  "Summer",
  "Monsoon",
  "Autumn",
  "Winter",
];

export const CAR_CATEGORIES: CarCategory[] = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Tempo Traveller",
  "Bus",
];

export const PACKAGE_SORTS = [
  { value: "popularity", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "latest", label: "Newest First" },
  { value: "duration", label: "Duration" },
] as const;

export type PackageSort = (typeof PACKAGE_SORTS)[number]["value"];

export const BUDGET_RANGES = [
  { value: "under-25k", label: "Under ₹25,000" },
  { value: "25k-50k", label: "₹25,000 – ₹50,000" },
  { value: "50k-100k", label: "₹50,000 – ₹1,00,000" },
  { value: "100k-plus", label: "₹1,00,000+" },
] as const;

export const TRAVELLER_OPTIONS = ["1", "2", "3-4", "5-8", "9+"] as const;

export const WHY_CHOOSE_US = [
  {
    icon: "ShieldCheck",
    title: "Government-Approved Guide",
    description:
      "Led by a Ministry of Tourism–certified guide with nearly a decade of hands-on experience across Incredible India.",
  },
  {
    icon: "Map",
    title: "Customized Travel Planning",
    description:
      "Flexible, tailor-made itineraries shaped around your interests, pace and budget — never a fixed template.",
  },
  {
    icon: "Globe2",
    title: "Licensed Multi-Lingual Guides",
    description:
      "Professional English-speaking drivers and licensed guides fluent in Spanish, Italian, German, Russian and French.",
  },
  {
    icon: "Headset",
    title: "24/7 Travel Assistance",
    description:
      "Competitive pricing, safe and comfortable transport, and a real person reachable at any hour of your trip.",
  },
] as const;
