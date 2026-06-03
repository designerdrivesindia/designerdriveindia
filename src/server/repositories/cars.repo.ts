import "server-only";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/server/db/client";
import { cars } from "@/server/db/schema";
import type { CarRow } from "@/server/db/schema";
import type { Car, CarCategory } from "@/types";
import { cars as seedCars } from "@/data/cars";

function toDomain(row: CarRow): Car {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as CarCategory,
    thumbnail: row.thumbnail,
    gallery: row.gallery,
    seats: row.seats,
    luggage: row.luggage,
    ac: row.ac,
    transmission: row.transmission as Car["transmission"],
    pricePerDay: row.pricePerDay,
    pricePerKm: row.pricePerKm,
    cities: row.cities,
    features: row.features,
    description: row.description,
    driverInfo: row.driverInfo,
    featured: row.featured,
  };
}

export const getCars = cache(async (): Promise<Car[]> => {
  if (!db) return seedCars;
  const rows = await db.select().from(cars);
  return rows.map(toDomain);
});

export const getFeaturedCars = cache(async (): Promise<Car[]> => {
  const all = await getCars();
  return all.filter((c) => c.featured);
});

export const getCarBySlug = cache(
  async (slug: string): Promise<Car | undefined> => {
    if (!db) return seedCars.find((c) => c.slug === slug);
    const [row] = await db.select().from(cars).where(eq(cars.slug, slug)).limit(1);
    return row ? toDomain(row) : undefined;
  },
);

/* ---------- Admin CRUD ---------- */
type NewCarRow = typeof cars.$inferInsert;

export async function getCarById(id: string): Promise<CarRow | undefined> {
  if (!db) return undefined;
  const [row] = await db.select().from(cars).where(eq(cars.id, id)).limit(1);
  return row;
}

export async function createCar(values: NewCarRow): Promise<CarRow> {
  if (!db) throw new Error("Database not configured");
  const [row] = await db.insert(cars).values(values).returning();
  return row;
}

export async function updateCar(id: string, patch: Partial<NewCarRow>) {
  if (!db) throw new Error("Database not configured");
  const [row] = await db
    .update(cars)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(cars.id, id))
    .returning();
  return row;
}

export async function deleteCar(id: string): Promise<void> {
  if (!db) throw new Error("Database not configured");
  await db.delete(cars).where(eq(cars.id, id));
}
