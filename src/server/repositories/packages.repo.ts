import "server-only";
import { cache } from "react";
import { eq, desc } from "drizzle-orm";
import { db } from "@/server/db/client";
import { packages } from "@/server/db/schema";
import type { PackageRow } from "@/server/db/schema";
type NewPackageRow = typeof packages.$inferInsert;
import type { Package, Country, TripType } from "@/types";
import { packages as seedPackages } from "@/data/packages";

function toDomain(row: PackageRow): Package {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    country: row.country as Country,
    state: row.state,
    destinationSlugs: row.destinationSlugs,
    durationDays: row.durationDays,
    durationNights: row.durationNights,
    startingPrice: row.startingPrice,
    tripTypes: row.tripTypes as TripType[],
    summary: row.summary,
    heroImage: row.heroImage,
    thumbnail: row.thumbnail,
    gallery: row.gallery,
    overview: row.overview,
    highlights: row.highlights,
    itinerary: row.itinerary,
    inclusions: row.inclusions,
    exclusions: row.exclusions,
    hotels: row.hotels,
    transport: row.transport,
    faqs: row.faqs,
    rating: row.rating,
    reviewCount: row.reviewCount,
    featured: row.featured,
    popularity: row.popularity,
    createdAt: row.createdAt.toISOString(),
    seo: row.seo ?? undefined,
  };
}

export const getPackages = cache(async (): Promise<Package[]> => {
  if (!db) return seedPackages;
  const rows = await db.select().from(packages).orderBy(desc(packages.popularity));
  return rows.map(toDomain);
});

export const getFeaturedPackages = cache(async (): Promise<Package[]> => {
  const all = await getPackages();
  return all.filter((p) => p.featured);
});

export const getPackageBySlug = cache(
  async (slug: string): Promise<Package | undefined> => {
    if (!db) return seedPackages.find((p) => p.slug === slug);
    const [row] = await db
      .select()
      .from(packages)
      .where(eq(packages.slug, slug))
      .limit(1);
    return row ? toDomain(row) : undefined;
  },
);

export const getPackagesByDestination = cache(
  async (destinationSlug: string): Promise<Package[]> => {
    const all = await getPackages();
    return all.filter((p) => p.destinationSlugs.includes(destinationSlug));
  },
);

export async function getRelatedPackages(
  pkg: { slug: string; country: string },
  limit = 3,
): Promise<Package[]> {
  const all = await getPackages();
  return all
    .filter((p) => p.slug !== pkg.slug && p.country === pkg.country)
    .slice(0, limit);
}

/* ---------- Admin CRUD ---------- */

export async function getPackageById(id: string): Promise<PackageRow | undefined> {
  if (!db) return undefined;
  const [row] = await db.select().from(packages).where(eq(packages.id, id)).limit(1);
  return row;
}

export async function createPackage(values: NewPackageRow): Promise<PackageRow> {
  if (!db) throw new Error("Database not configured");
  const [row] = await db.insert(packages).values(values).returning();
  return row;
}

export async function updatePackage(
  id: string,
  patch: Partial<NewPackageRow>,
): Promise<PackageRow | undefined> {
  if (!db) throw new Error("Database not configured");
  const [row] = await db
    .update(packages)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(packages.id, id))
    .returning();
  return row;
}

export async function deletePackage(id: string): Promise<void> {
  if (!db) throw new Error("Database not configured");
  await db.delete(packages).where(eq(packages.id, id));
}
