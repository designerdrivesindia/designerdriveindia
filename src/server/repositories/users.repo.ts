import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/server/db/client";
import { users } from "@/server/db/schema";
import type { UserRow, NewUserRow } from "@/server/db/schema";

export async function getUserByEmail(email: string): Promise<UserRow | undefined> {
  if (!db) return undefined;
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);
  return row;
}

export async function listUsers(): Promise<UserRow[]> {
  if (!db) return [];
  return db.select().from(users).orderBy(users.createdAt);
}

export async function setUserActive(id: string, isActive: boolean) {
  if (!db) return;
  await db.update(users).set({ isActive, updatedAt: new Date() }).where(eq(users.id, id));
}

export async function getUserById(id: string): Promise<UserRow | undefined> {
  if (!db) return undefined;
  const [row] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return row;
}

export async function createUser(values: NewUserRow): Promise<UserRow> {
  if (!db) throw new Error("Database not configured");
  const [row] = await db
    .insert(users)
    .values({ ...values, email: values.email.toLowerCase() })
    .returning();
  return row;
}

export async function touchLastLogin(id: string): Promise<void> {
  if (!db) return;
  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, id));
}

/** Public-safe shape (never expose the password hash). */
export function toPublicUser(row: UserRow) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    avatarUrl: row.avatarUrl,
    isActive: row.isActive,
  };
}
export type PublicUser = ReturnType<typeof toPublicUser>;
