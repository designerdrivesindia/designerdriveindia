import "server-only";
import { cookies } from "next/headers";
import { createHash, randomUUID } from "node:crypto";
import { and, eq, isNull, gt } from "drizzle-orm";
import { db } from "@/server/db/client";
import { refreshTokens } from "@/server/db/schema";
import type { UserRow } from "@/server/db/schema";
import { env } from "@/lib/env";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  REFRESH_TTL_DAYS,
  type AccessClaims,
} from "./jwt";
import { getUserById, toPublicUser, type PublicUser } from "@/server/repositories/users.repo";

const COOKIE_ACCESS = "dd_access";
const COOKIE_REFRESH = "dd_refresh";
const ACCESS_MAX_AGE = 15 * 60; // 15 minutes
const REFRESH_MAX_AGE = REFRESH_TTL_DAYS * 24 * 60 * 60;

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

function baseCookie(maxAge: number) {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

/** Issue a fresh access + (rotating) refresh token pair and set cookies. */
export async function createSession(user: UserRow, userAgent?: string) {
  const jti = randomUUID();
  const refreshToken = await signRefreshToken(user.id, jti);
  const accessToken = await signAccessToken(user);

  if (db) {
    await db.insert(refreshTokens).values({
      userId: user.id,
      tokenHash: sha256(refreshToken),
      userAgent: userAgent ?? null,
      expiresAt: new Date(Date.now() + REFRESH_MAX_AGE * 1000),
    });
  }

  const store = await cookies();
  store.set(COOKIE_ACCESS, accessToken, baseCookie(ACCESS_MAX_AGE));
  store.set(COOKIE_REFRESH, refreshToken, baseCookie(REFRESH_MAX_AGE));
}

/** Read and verify the current access token. Returns claims or null. */
export async function getSessionClaims(): Promise<AccessClaims | null> {
  const store = await cookies();
  const token = store.get(COOKIE_ACCESS)?.value;
  if (!token) return null;
  return verifyAccessToken(token);
}

/** Current authenticated user (from access-token claims; no DB hit). */
export async function getCurrentUser(): Promise<PublicUser | null> {
  const claims = await getSessionClaims();
  if (!claims) return null;
  return {
    id: claims.sub,
    name: claims.name,
    email: claims.email,
    role: claims.role,
    avatarUrl: null,
    isActive: true,
  };
}

type AuthResult =
  | { ok: true; user: PublicUser }
  | { ok: false; status: 401 | 403; error: string };

/** Guard for route handlers: require a session, optionally with a role. */
export async function requireAuth(roles?: UserRow["role"][]): Promise<AuthResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, status: 401, error: "Authentication required" };
  if (roles && !roles.includes(user.role)) {
    return { ok: false, status: 403, error: "Insufficient permissions" };
  }
  return { ok: true, user };
}

/** Rotate the refresh token (revoke old, issue new). Returns the user or null. */
export async function rotateSession(userAgent?: string): Promise<PublicUser | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_REFRESH)?.value;
  if (!raw || !db) return null;

  const payload = await verifyRefreshToken(raw);
  if (!payload) {
    await destroySession();
    return null;
  }

  const hash = sha256(raw);
  const [row] = await db
    .select()
    .from(refreshTokens)
    .where(
      and(
        eq(refreshTokens.tokenHash, hash),
        eq(refreshTokens.userId, payload.sub),
        isNull(refreshTokens.revokedAt),
        gt(refreshTokens.expiresAt, new Date()),
      ),
    )
    .limit(1);

  if (!row) {
    // Token reuse or unknown — force re-login.
    await destroySession();
    return null;
  }

  // Revoke the used token (rotation).
  await db
    .update(refreshTokens)
    .set({ revokedAt: new Date() })
    .where(eq(refreshTokens.id, row.id));

  const user = await getUserById(payload.sub);
  if (!user || !user.isActive) {
    await destroySession();
    return null;
  }

  await createSession(user, userAgent);
  return toPublicUser(user);
}

/** Clear cookies and revoke the active refresh token. */
export async function destroySession() {
  const store = await cookies();
  const raw = store.get(COOKIE_REFRESH)?.value;
  if (raw && db) {
    await db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.tokenHash, sha256(raw)));
  }
  store.delete(COOKIE_ACCESS);
  store.delete(COOKIE_REFRESH);
}
