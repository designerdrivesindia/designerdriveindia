import "server-only";
import { z } from "zod";
import { getUserByEmail, touchLastLogin, toPublicUser, type PublicUser } from "@/server/repositories/users.repo";
import { verifyPassword } from "@/server/auth/password";
import { createSession } from "@/server/auth/session";
import { isDbConfigured } from "@/lib/env";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginResult =
  | { ok: true; user: PublicUser }
  | { ok: false; status: number; error: string };

export async function login(
  input: unknown,
  userAgent?: string,
): Promise<LoginResult> {
  if (!isDbConfigured) {
    return { ok: false, status: 503, error: "Authentication is not configured" };
  }

  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, status: 422, error: "Invalid email or password format" };
  }

  const user = await getUserByEmail(parsed.data.email);
  // Constant-ish failure path — don't reveal whether the email exists.
  if (!user || !user.isActive) {
    return { ok: false, status: 401, error: "Invalid credentials" };
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    return { ok: false, status: 401, error: "Invalid credentials" };
  }

  await touchLastLogin(user.id);
  await createSession(user, userAgent);
  return { ok: true, user: toPublicUser(user) };
}
