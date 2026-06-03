import "server-only";
import { eq, desc, and, count, sql, type SQL } from "drizzle-orm";
import { db } from "@/server/db/client";
import { inquiries, inquiryNotes } from "@/server/db/schema";
import type { InquiryRow, NewInquiryRow } from "@/server/db/schema";
import type { InquiryPayload } from "@/types";

export type InquiryStatus = InquiryRow["status"];

export async function createInquiry(
  payload: InquiryPayload,
): Promise<{ id: string; createdAt: string }> {
  if (!db) {
    // Dev/preview without a database — accept and acknowledge.
    return { id: `local-${Date.now()}`, createdAt: new Date().toISOString() };
  }
  const values: NewInquiryRow = {
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    whatsapp: payload.whatsapp || null,
    destination: payload.destination || null,
    travelDate: payload.travelDate || null,
    travelers: payload.travelers ?? null,
    budget: payload.budget || null,
    message: payload.message || null,
    source: payload.source,
    referenceId: payload.referenceId || null,
    referenceTitle: payload.referenceTitle || null,
  };
  const [row] = await db
    .insert(inquiries)
    .values(values)
    .returning({ id: inquiries.id, createdAt: inquiries.createdAt });
  return { id: row.id, createdAt: row.createdAt.toISOString() };
}

export interface InquiryFilter {
  status?: InquiryStatus;
  source?: InquiryRow["source"];
  page?: number;
  pageSize?: number;
}

export async function listInquiries(filter: InquiryFilter = {}) {
  if (!db) return { data: [] as InquiryRow[], total: 0, page: 1, pageSize: 20 };
  const page = Math.max(1, filter.page ?? 1);
  const pageSize = Math.min(100, filter.pageSize ?? 20);

  const conditions: SQL[] = [];
  if (filter.status) conditions.push(eq(inquiries.status, filter.status));
  if (filter.source) conditions.push(eq(inquiries.source, filter.source));
  const where = conditions.length ? and(...conditions) : undefined;

  const [rows, [{ value: total }]] = await Promise.all([
    db
      .select()
      .from(inquiries)
      .where(where)
      .orderBy(desc(inquiries.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db.select({ value: count() }).from(inquiries).where(where),
  ]);

  return { data: rows, total, page, pageSize };
}

export async function getInquiryById(id: string) {
  if (!db) return undefined;
  const [row] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return row;
}

export async function updateInquiry(
  id: string,
  patch: Partial<Pick<InquiryRow, "status" | "assignedToId">>,
) {
  if (!db) return undefined;
  const [row] = await db
    .update(inquiries)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(inquiries.id, id))
    .returning();
  return row;
}

export async function addInquiryNote(
  inquiryId: string,
  authorId: string | null,
  body: string,
) {
  if (!db) return undefined;
  const [row] = await db
    .insert(inquiryNotes)
    .values({ inquiryId, authorId, body })
    .returning();
  return row;
}

export async function listInquiryNotes(inquiryId: string) {
  if (!db) return [];
  return db
    .select()
    .from(inquiryNotes)
    .where(eq(inquiryNotes.inquiryId, inquiryId))
    .orderBy(desc(inquiryNotes.createdAt));
}

export async function getRecentInquiries(limit = 6) {
  if (!db) return [] as InquiryRow[];
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(limit);
}

/** Lead counts grouped by source (for the dashboard breakdown). */
export async function getInquirySourceBreakdown() {
  if (!db) return [] as { source: InquiryRow["source"]; value: number }[];
  return db
    .select({ source: inquiries.source, value: count() })
    .from(inquiries)
    .groupBy(inquiries.source);
}

/** Most-requested destinations (top leads by destination). */
export async function getTopDestinations(limit = 5) {
  if (!db) return [] as { destination: string; value: number }[];
  const rows = await db
    .select({ destination: inquiries.destination, value: count() })
    .from(inquiries)
    .where(sql`${inquiries.destination} is not null`)
    .groupBy(inquiries.destination)
    .orderBy(desc(count()))
    .limit(limit);
  return rows
    .filter((r): r is { destination: string; value: number } => !!r.destination);
}

/** Dashboard analytics: counts grouped by status + recent leads. */
export async function getInquiryStats() {
  if (!db) {
    return {
      total: 0,
      byStatus: {} as Record<InquiryStatus, number>,
      last30Days: 0,
    };
  }
  const [byStatusRows, [{ value: total }], [{ value: last30Days }]] =
    await Promise.all([
      db
        .select({ status: inquiries.status, value: count() })
        .from(inquiries)
        .groupBy(inquiries.status),
      db.select({ value: count() }).from(inquiries),
      db
        .select({ value: count() })
        .from(inquiries)
        .where(sql`${inquiries.createdAt} > now() - interval '30 days'`),
    ]);

  const byStatus = byStatusRows.reduce(
    (acc, r) => ({ ...acc, [r.status]: r.value }),
    {} as Record<InquiryStatus, number>,
  );
  return { total, byStatus, last30Days };
}
