/**
 * Domain types shared across the public site.
 * These mirror the backend Prisma models so the API layer can return them directly.
 */

export type Country = "India" | "Nepal" | "Bhutan" | "Sri Lanka" | "Dubai" | "Thailand" | "Maldives";

export type TripType =
  | "Honeymoon"
  | "Family"
  | "Adventure"
  | "Luxury"
  | "Pilgrimage"
  | "Wildlife"
  | "Group Tour"
  | "Private Tour"
  | "Student college Tour"
  | "Education Tour"
  | "Group";

export type Season = "Spring" | "Summer" | "Monsoon" | "Autumn" | "Winter";

export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: Country;
  region: string;
  tagline: string;
  heroImage: string;
  thumbnail: string;
  overview: string;
  bestTimeToVisit: string;
  seasons: Season[];
  tripTypes: TripType[];
  attractions: { title: string; description: string }[];
  travelTips: string[];
  gallery: GalleryImage[];
  featured: boolean;
  seo?: SeoMeta;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string[];
  stay?: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  country: Country;
  state: string;
  destinationSlugs: string[];
  durationDays: number;
  durationNights: number;
  startingPrice: number;
  tripTypes: TripType[];
  summary: string;
  heroImage: string;
  thumbnail: string;
  gallery: GalleryImage[];
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  hotels: { city: string; name: string; category: string }[];
  transport: string;
  faqs: { question: string; answer: string }[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  popularity: number;
  createdAt: string;
  seo?: SeoMeta;
}

export type CarCategory =
  | "SUV"
  | "Sedan"
  | "Hatchback"
  | "Luxury"
  | "Tempo Traveller"
  | "Bus";

export interface Car {
  id: string;
  slug: string;
  name: string;
  category: CarCategory;
  thumbnail: string;
  gallery: GalleryImage[];
  seats: number;
  luggage: number;
  ac: boolean;
  transmission: "Manual" | "Automatic";
  pricePerDay: number;
  pricePerKm: number;
  cities: string[];
  features: string[];
  description: string;
  driverInfo: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: { name: string; role: string; avatar?: string };
  publishedAt: string;
  readMinutes: number;
  content: { heading: string; body: string }[];
  featured: boolean;
  seo?: SeoMeta;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  trip: string;
  rating: number;
  quote: string;
  avatar?: string;
}

/* ---- Inquiry (lead-generation core) ---- */

export type InquirySource = "package" | "car" | "destination" | "contact" | "general";

export interface InquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  destination?: string;
  travelDate?: string;
  travelers?: number;
  budget?: string;
  message?: string;
  source: InquirySource;
  referenceId?: string; // package/car/destination id
  referenceTitle?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
