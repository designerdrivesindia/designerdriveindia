import "server-only";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/server/db/client";
import { destinations } from "@/server/db/schema";
import type { DestinationRow } from "@/server/db/schema";
import type { Destination, Country, Season, TripType } from "@/types";
import { destinations as seedDestinations } from "@/data/destinations";

function toDomain(row: DestinationRow): Destination {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    country: row.country as Country,
    region: row.region,
    tagline: row.tagline,
    heroImage: row.heroImage,
    thumbnail: row.thumbnail,
    overview: row.overview,
    bestTimeToVisit: row.bestTimeToVisit,
    seasons: row.seasons as Season[],
    tripTypes: row.tripTypes as TripType[],
    attractions: row.attractions,
    travelTips: row.travelTips,
    gallery: row.gallery,
    featured: row.featured,
    seo: row.seo ?? undefined,
  };
}

export const getDestinations = cache(async (): Promise<Destination[]> => {
  if (!db) return seedDestinations;
  const rows = await db.select().from(destinations);
  return rows.map(toDomain);
});

export const getFeaturedDestinations = cache(async (): Promise<Destination[]> => {
  const all = await getDestinations();
  return all.filter((d) => d.featured);
});

export const getDestinationBySlug = cache(
  async (slug: string): Promise<Destination | undefined> => {
    if (!db) return seedDestinations.find((d) => d.slug === slug);
    const [row] = await db
      .select()
      .from(destinations)
      .where(eq(destinations.slug, slug))
      .limit(1);
    return row ? toDomain(row) : undefined;
  },
);

/* ---------- Admin CRUD ---------- */
type NewDestinationRow = typeof destinations.$inferInsert;

export async function getDestinationById(id: string): Promise<DestinationRow | undefined> {
  if (!db) return undefined;
  const [row] = await db.select().from(destinations).where(eq(destinations.id, id)).limit(1);
  return row;
}

export async function createDestination(values: NewDestinationRow): Promise<DestinationRow> {
  if (!db) throw new Error("Database not configured");
  const [row] = await db.insert(destinations).values(values).returning();
  return row;
}

export async function updateDestination(id: string, patch: Partial<NewDestinationRow>) {
  if (!db) throw new Error("Database not configured");
  const [row] = await db
    .update(destinations)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(destinations.id, id))
    .returning();
  return row;
}

export async function deleteDestination(id: string): Promise<void> {
  if (!db) throw new Error("Database not configured");
  await db.delete(destinations).where(eq(destinations.id, id));
}
