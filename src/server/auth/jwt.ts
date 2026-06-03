import "server-only";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { accessSecret, refreshSecret } from "@/lib/env";
import type { UserRow } from "@/server/db/schema";

const enc = new TextEncoder();
const accessKey = enc.encode(accessSecret);
const refreshKey = enc.encode(refreshSecret);

export const ACCESS_TTL = "15m";
export const REFRESH_TTL_DAYS = 7;

export interface AccessClaims extends JWTPayload {
  sub: string;
  role: UserRow["role"];
  name: string;
  email: string;
}

export async function signAccessToken(user: UserRow): Promise<string> {
  return new SignJWT({ role: user.role, name: user.name, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TTL)
    .sign(accessKey);
}

export async function signRefreshToken(userId: string, jti: string): Promise<string> {
  return new SignJWT({ jti })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${REFRESH_TTL_DAYS}d`)
    .sign(refreshKey);
}

export async function verifyAccessToken(token: string): Promise<AccessClaims | null> {
  try {
    const { payload } = await jwtVerify(token, accessKey);
    return payload as AccessClaims;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string,
): Promise<{ sub: string; jti: string } | null> {
  try {
    const { payload } = await jwtVerify(token, refreshKey);
    return { sub: payload.sub as string, jti: payload.jti as string };
  } catch {
    return null;
  }
}
