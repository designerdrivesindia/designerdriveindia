import "server-only";
import { z } from "zod";

/**
 * Server-side environment validation.
 *
 * DB / auth secrets are optional so the app builds and runs in preview/dev
 * without a database (repositories fall back to seed data, auth is disabled).
 * In production these MUST be set — see `assertProductionEnv()`.
 */
const schema = z.object({
  DATABASE_URL: z.string().url().optional(),
  JWT_ACCESS_SECRET: z.string().min(16).optional(),
  JWT_REFRESH_SECRET: z.string().min(16).optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;

/** True when a database connection string is configured. */
export const isDbConfigured = Boolean(env.DATABASE_URL);

/** True when JWT auth can operate (both secrets present). */
export const isAuthConfigured = Boolean(
  env.JWT_ACCESS_SECRET && env.JWT_REFRESH_SECRET,
);

/** Dev fallbacks so local auth works without manual secret setup. */
export const accessSecret =
  env.JWT_ACCESS_SECRET ?? "dev-access-secret-change-me-in-production";
export const refreshSecret =
  env.JWT_REFRESH_SECRET ?? "dev-refresh-secret-change-me-in-production";

/** Hard-fail at startup if production is missing critical secrets. */
export function assertProductionEnv() {
  if (env.NODE_ENV !== "production") return;
  const missing: string[] = [];
  if (!env.DATABASE_URL) missing.push("DATABASE_URL");
  if (!env.JWT_ACCESS_SECRET) missing.push("JWT_ACCESS_SECRET");
  if (!env.JWT_REFRESH_SECRET) missing.push("JWT_REFRESH_SECRET");
  if (missing.length) {
    throw new Error(`Missing required production env vars: ${missing.join(", ")}`);
  }
}
