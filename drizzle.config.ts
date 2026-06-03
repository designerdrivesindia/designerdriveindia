import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load Next.js-style env files for the drizzle-kit CLI (it runs outside Next).
config({ path: ".env.local" });
config(); // .env fallback (does not override already-set vars)

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  casing: "snake_case",
  verbose: true,
  strict: true,
});
