/**
 * Field configuration that drives the generic admin content editor.
 * Plain data (client + server safe). One source of truth per entity for
 * the list view, the form, and the save action.
 */
export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "list" // string[] entered one-per-line
  | "json"; // arbitrary JSON (nested arrays/objects)

export interface AdminField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: readonly string[];
  placeholder?: string;
  help?: string;
  full?: boolean; // span both columns
}

export type EntityKey = "packages" | "destinations" | "cars" | "blog";

export interface EntityConfig {
  key: EntityKey;
  singular: string;
  plural: string;
  titleField: string; // primary display field
  fields: AdminField[];
}

const COUNTRIES = ["India", "Nepal", "Bhutan", "Sri Lanka"] as const;

export const entityConfigs: Record<EntityKey, EntityConfig> = {
  packages: {
    key: "packages",
    singular: "Package",
    plural: "Packages",
    titleField: "title",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true, help: "URL: /packages/<slug>" },
      { key: "country", label: "Country", type: "select", options: COUNTRIES, required: true },
      { key: "state", label: "State / region", type: "text", required: true },
      { key: "durationDays", label: "Duration (days)", type: "number", required: true },
      { key: "durationNights", label: "Duration (nights)", type: "number", required: true },
      { key: "startingPrice", label: "Starting price (₹)", type: "number", required: true },
      { key: "popularity", label: "Popularity (0–100)", type: "number" },
      { key: "rating", label: "Rating (0–5)", type: "number" },
      { key: "reviewCount", label: "Review count", type: "number" },
      { key: "featured", label: "Featured", type: "boolean" },
      { key: "heroImage", label: "Hero image URL", type: "text", required: true, full: true },
      { key: "thumbnail", label: "Thumbnail URL", type: "text", required: true, full: true },
      { key: "summary", label: "Summary", type: "textarea", required: true, full: true },
      { key: "overview", label: "Overview", type: "textarea", required: true, full: true },
      { key: "transport", label: "Transport", type: "textarea", full: true },
      { key: "tripTypes", label: "Trip types", type: "list", full: true, help: "One per line" },
      { key: "destinationSlugs", label: "Destination slugs", type: "list", full: true, help: "One per line" },
      { key: "highlights", label: "Highlights", type: "list", full: true, help: "One per line" },
      { key: "inclusions", label: "Inclusions", type: "list", full: true, help: "One per line" },
      { key: "exclusions", label: "Exclusions", type: "list", full: true, help: "One per line" },
      { key: "itinerary", label: "Itinerary", type: "json", full: true, help: '[{ "day": 1, "title": "", "description": "", "stay": "", "meals": [] }]' },
      { key: "hotels", label: "Hotels", type: "json", full: true, help: '[{ "city": "", "name": "", "category": "" }]' },
      { key: "faqs", label: "FAQs", type: "json", full: true, help: '[{ "question": "", "answer": "" }]' },
      { key: "gallery", label: "Gallery", type: "json", full: true, help: '[{ "src": "", "alt": "" }]' },
      { key: "seo", label: "SEO", type: "json", full: true, help: '{ "title": "", "description": "" }' },
    ],
  },
  destinations: {
    key: "destinations",
    singular: "Destination",
    plural: "Destinations",
    titleField: "name",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "country", label: "Country", type: "select", options: COUNTRIES, required: true },
      { key: "region", label: "Region", type: "text", required: true },
      { key: "featured", label: "Featured", type: "boolean" },
      { key: "tagline", label: "Tagline", type: "textarea", required: true, full: true },
      { key: "heroImage", label: "Hero image URL", type: "text", required: true, full: true },
      { key: "thumbnail", label: "Thumbnail URL", type: "text", required: true, full: true },
      { key: "overview", label: "Overview", type: "textarea", required: true, full: true },
      { key: "bestTimeToVisit", label: "Best time to visit", type: "textarea", required: true, full: true },
      { key: "seasons", label: "Seasons", type: "list", full: true, help: "One per line" },
      { key: "tripTypes", label: "Trip types", type: "list", full: true, help: "One per line" },
      { key: "travelTips", label: "Travel tips", type: "list", full: true, help: "One per line" },
      { key: "attractions", label: "Attractions", type: "json", full: true, help: '[{ "title": "", "description": "" }]' },
      { key: "gallery", label: "Gallery", type: "json", full: true, help: '[{ "src": "", "alt": "" }]' },
      { key: "seo", label: "SEO", type: "json", full: true },
    ],
  },
  cars: {
    key: "cars",
    singular: "Car",
    plural: "Cars",
    titleField: "name",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "category", label: "Category", type: "select", options: ["SUV", "Sedan", "Hatchback", "Luxury", "Tempo Traveller", "Bus"], required: true },
      { key: "transmission", label: "Transmission", type: "select", options: ["Manual", "Automatic"], required: true },
      { key: "seats", label: "Seats", type: "number", required: true },
      { key: "luggage", label: "Luggage (bags)", type: "number", required: true },
      { key: "pricePerDay", label: "Price / day (₹)", type: "number", required: true },
      { key: "pricePerKm", label: "Price / km (₹)", type: "number", required: true },
      { key: "ac", label: "Air-conditioned", type: "boolean" },
      { key: "featured", label: "Featured", type: "boolean" },
      { key: "thumbnail", label: "Thumbnail URL", type: "text", required: true, full: true },
      { key: "description", label: "Description", type: "textarea", required: true, full: true },
      { key: "driverInfo", label: "Driver info", type: "textarea", required: true, full: true },
      { key: "cities", label: "Available cities", type: "list", full: true, help: "One per line" },
      { key: "features", label: "Features", type: "list", full: true, help: "One per line" },
      { key: "gallery", label: "Gallery", type: "json", full: true, help: '[{ "src": "", "alt": "" }]' },
    ],
  },
  blog: {
    key: "blog",
    singular: "Post",
    plural: "Blog posts",
    titleField: "title",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "category", label: "Category", type: "text", required: true },
      { key: "status", label: "Status", type: "select", options: ["draft", "published"], required: true },
      { key: "readMinutes", label: "Read time (min)", type: "number" },
      { key: "featured", label: "Featured", type: "boolean" },
      { key: "coverImage", label: "Cover image URL", type: "text", required: true, full: true },
      { key: "excerpt", label: "Excerpt", type: "textarea", required: true, full: true },
      { key: "tags", label: "Tags", type: "list", full: true, help: "One per line" },
      { key: "author", label: "Author", type: "json", full: true, required: true, help: '{ "name": "", "role": "" }' },
      { key: "content", label: "Content sections", type: "json", full: true, required: true, help: '[{ "heading": "", "body": "" }]' },
      { key: "seo", label: "SEO", type: "json", full: true },
    ],
  },
};
