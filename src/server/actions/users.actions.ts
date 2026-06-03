"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAuth } from "@/server/auth/session";
import { hashPassword } from "@/server/auth/password";
import { createUser, getUserByEmail, setUserActive } from "@/server/repositories/users.repo";

const createSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["super_admin", "content_manager", "sales_manager"]),
});

export async function createUserAction(input: unknown) {
  const auth = await requireAuth(["super_admin"]);
  if (!auth.ok) return { ok: false as const, error: auth.error };

  const parsed = createSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const existing = await getUserByEmail(parsed.data.email);
  if (existing) return { ok: false as const, error: "A user with that email already exists" };

  await createUser({
    name: parsed.data.name,
    email: parsed.data.email,
    role: parsed.data.role,
    passwordHash: await hashPassword(parsed.data.password),
  });
  revalidatePath("/admin/users");
  return { ok: true as const };
}

export async function toggleUserActiveAction(id: string, isActive: boolean) {
  const auth = await requireAuth(["super_admin"]);
  if (!auth.ok) return { ok: false as const, error: auth.error };
  if (auth.user.id === id) return { ok: false as const, error: "You cannot deactivate yourself" };

  await setUserActive(id, isActive);
  revalidatePath("/admin/users");
  return { ok: true as const };
}
