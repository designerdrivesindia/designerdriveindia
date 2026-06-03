import "server-only";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env, isDbConfigured } from "@/lib/env";
import * as schema from "./schema";

/**
 * Neon serverless Postgres client (HTTP driver) — ideal for short-lived
 * serverless functions and Server Components. Connection pooling is handled
 * by Neon's pooled endpoint, so no client-side pool to manage.
 *
 * `db` is null when DATABASE_URL is absent; repositories fall back to seed
 * data in that case (dev/preview convenience). Production always has a URL.
 */
export const db = isDbConfigured
  ? drizzle(neon(env.DATABASE_URL!), { schema })
  : null;

export type Database = NonNullable<typeof db>;
export { schema };
