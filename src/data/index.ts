import { destinations } from "./destinations";
import { packages } from "./packages";
import { cars } from "./cars";
import { blogPosts } from "./blog";
import { testimonials } from "./testimonials";

export { destinations, packages, cars, blogPosts, testimonials };

/* ---------- Destinations ---------- */
export const getDestinations = () => destinations;
export const getFeaturedDestinations = () => destinations.filter((d) => d.featured);
export const getDestinationBySlug = (slug: string) =>
  destinations.find((d) => d.slug === slug);

/* ---------- Packages ---------- */
export const getPackages = () => packages;
export const getFeaturedPackages = () => packages.filter((p) => p.featured);
export const getPackageBySlug = (slug: string) =>
  packages.find((p) => p.slug === slug);
export const getPackagesByDestination = (destinationSlug: string) =>
  packages.filter((p) => p.destinationSlugs.includes(destinationSlug));
export const getRelatedPackages = (pkg: { slug: string; country: string }, limit = 3) =>
  packages.filter((p) => p.slug !== pkg.slug && p.country === pkg.country).slice(0, limit);

/* ---------- Cars ---------- */
export const getCars = () => cars;
export const getFeaturedCars = () => cars.filter((c) => c.featured);
export const getCarBySlug = (slug: string) => cars.find((c) => c.slug === slug);

/* ---------- Blog ---------- */
export const getBlogPosts = () =>
  [...blogPosts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
export const getFeaturedPosts = () => blogPosts.filter((p) => p.featured);
export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
export const getRelatedPosts = (post: { slug: string; category: string }, limit = 3) =>
  blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, limit);

/* ---------- Testimonials ---------- */
export const getTestimonials = () => testimonials;
