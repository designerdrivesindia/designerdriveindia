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
    title: "Trusted Local Drivers",
    description:
      "Vetted, courteous chauffeurs who know every bend of the mountain roads — your journey, in safe hands.",
  },
  {
    icon: "Map",
    title: "Personalised Itineraries",
    description:
      "No cookie-cutter tours. Every route, stay and stop is shaped around the way you like to travel.",
  },
  {
    icon: "Globe2",
    title: "Pan-India & Himalayan Reach",
    description:
      "From Kashmir to Kerala, Nepal to Bhutan — one trusted partner for the entire subcontinent.",
  },
  {
    icon: "Headset",
    title: "24/7 On-Trip Support",
    description:
      "A real person on the line at any hour. We stay with you from first enquiry to safe return home.",
  },
] as const;
