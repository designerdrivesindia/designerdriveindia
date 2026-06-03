import "server-only";
import type { Testimonial } from "@/types";
import { testimonials as seedTestimonials } from "@/data/testimonials";

// Testimonials are curated/static content; served from seed.
export async function getTestimonials(): Promise<Testimonial[]> {
  return seedTestimonials;
}
