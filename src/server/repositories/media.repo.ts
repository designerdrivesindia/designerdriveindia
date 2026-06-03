import "server-only";
import { eq, desc } from "drizzle-orm";
import { db } from "@/server/db/client";
import { media } from "@/server/db/schema";
import type { MediaRow } from "@/server/db/schema";

type NewMediaRow = typeof media.$inferInsert;

export async function listMedia(): Promise<MediaRow[]> {
  if (!db) return [];
  return db.select().from(media).orderBy(desc(media.createdAt));
}

export async function createMedia(values: NewMediaRow): Promise<MediaRow> {
  if (!db) throw new Error("Database not configured");
  const [row] = await db.insert(media).values(values).returning();
  return row;
}

export async function getMediaById(id: string): Promise<MediaRow | undefined> {
  if (!db) return undefined;
  const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);
  return row;
}

export async function deleteMedia(id: string): Promise<MediaRow | undefined> {
  if (!db) return undefined;
  const [row] = await db.delete(media).where(eq(media.id, id)).returning();
  return row;
}
