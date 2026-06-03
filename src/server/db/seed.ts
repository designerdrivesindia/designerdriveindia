import { config } from "dotenv";
config({ path: ".env.local" });
config();
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";
import * as schema from "./schema";
import { destinations as seedDestinations } from "../../data/destinations";
import { packages as seedPackages } from "../../data/packages";
import { cars as seedCars } from "../../data/cars";
import { blogPosts as seedPosts } from "../../data/blog";

/**
 * Seed the database from the curated seed content in `src/data`.
 * Idempotent: existing slugs are skipped (onConflictDoNothing).
 *
 *   DATABASE_URL=... npm run db:seed
 */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required to seed. Set it in .env.local");
  }
  const db = drizzle(neon(url), { schema });

  console.log("🌱 Seeding destinations…");
  for (const d of seedDestinations) {
    await db
      .insert(schema.destinations)
      .values({
        slug: d.slug,
        name: d.name,
        country: d.country,
        region: d.region,
        tagline: d.tagline,
        heroImage: d.heroImage,
        thumbnail: d.thumbnail,
        overview: d.overview,
        bestTimeToVisit: d.bestTimeToVisit,
        seasons: d.seasons,
        tripTypes: d.tripTypes,
        attractions: d.attractions,
        travelTips: d.travelTips,
        gallery: d.gallery,
        featured: d.featured,
        seo: d.seo ?? null,
      })
      .onConflictDoNothing({ target: schema.destinations.slug });
  }

  console.log("🌱 Seeding packages…");
  for (const p of seedPackages) {
    await db
      .insert(schema.packages)
      .values({
        slug: p.slug,
        title: p.title,
        country: p.country,
        state: p.state,
        destinationSlugs: p.destinationSlugs,
        durationDays: p.durationDays,
        durationNights: p.durationNights,
        startingPrice: p.startingPrice,
        tripTypes: p.tripTypes,
        summary: p.summary,
        heroImage: p.heroImage,
        thumbnail: p.thumbnail,
        gallery: p.gallery,
        overview: p.overview,
        highlights: p.highlights,
        itinerary: p.itinerary,
        inclusions: p.inclusions,
        exclusions: p.exclusions,
        hotels: p.hotels,
        transport: p.transport,
        faqs: p.faqs,
        rating: p.rating,
        reviewCount: p.reviewCount,
        featured: p.featured,
        popularity: p.popularity,
        seo: p.seo ?? null,
        createdAt: new Date(p.createdAt),
      })
      .onConflictDoNothing({ target: schema.packages.slug });
  }

  console.log("🌱 Seeding cars…");
  for (const c of seedCars) {
    await db
      .insert(schema.cars)
      .values({
        slug: c.slug,
        name: c.name,
        category: c.category,
        thumbnail: c.thumbnail,
        gallery: c.gallery,
        seats: c.seats,
        luggage: c.luggage,
        ac: c.ac,
        transmission: c.transmission,
        pricePerDay: c.pricePerDay,
        pricePerKm: c.pricePerKm,
        cities: c.cities,
        features: c.features,
        description: c.description,
        driverInfo: c.driverInfo,
        featured: c.featured,
      })
      .onConflictDoNothing({ target: schema.cars.slug });
  }

  console.log("🌱 Seeding blog posts…");
  for (const b of seedPosts) {
    await db
      .insert(schema.blogPosts)
      .values({
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        coverImage: b.coverImage,
        category: b.category,
        tags: b.tags,
        author: b.author,
        content: b.content,
        readMinutes: b.readMinutes,
        status: "published",
        featured: b.featured,
        seo: b.seo ?? null,
        publishedAt: new Date(b.publishedAt),
      })
      .onConflictDoNothing({ target: schema.blogPosts.slug });
  }

  // Initial admin user
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@designerdrivesindia.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  console.log(`🌱 Ensuring admin user (${adminEmail})…`);
  await db
    .insert(schema.users)
    .values({
      name: "Site Administrator",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "super_admin",
    })
    .onConflictDoNothing({ target: schema.users.email });

  console.log("✅ Seed complete.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
