import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/server/db/client";
import { settings } from "@/server/db/schema";

export async function getSetting<T = unknown>(key: string): Promise<T | null> {
  if (!db) return null;
  const [row] = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
  return (row?.value as T) ?? null;
}

export async function upsertSetting(key: string, value: unknown): Promise<void> {
  if (!db) throw new Error("Database not configured");
  await db
    .insert(settings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value, updatedAt: new Date() },
    });
}
