"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/server/auth/session";
import {
  updateInquiry,
  addInquiryNote,
  type InquiryStatus,
} from "@/server/repositories/inquiries.repo";

const SALES_ROLES = ["super_admin", "sales_manager"] as const;

export type ActionResult = { ok: boolean; error?: string };

export async function updateInquiryStatusAction(
  id: string,
  status: InquiryStatus,
): Promise<ActionResult> {
  const auth = await requireAuth([...SALES_ROLES]);
  if (!auth.ok) return { ok: false, error: auth.error };

  await updateInquiry(id, { status });
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
  revalidatePath("/admin");
  return { ok: true };
}

export async function assignInquiryAction(
  id: string,
  assignedToId: string | null,
): Promise<ActionResult> {
  const auth = await requireAuth([...SALES_ROLES]);
  if (!auth.ok) return { ok: false, error: auth.error };

  await updateInquiry(id, { assignedToId });
  revalidatePath(`/admin/inquiries/${id}`);
  return { ok: true };
}

export async function addInquiryNoteAction(
  id: string,
  body: string,
): Promise<ActionResult> {
  const auth = await requireAuth([...SALES_ROLES]);
  if (!auth.ok) return { ok: false, error: auth.error };
  if (!body.trim()) return { ok: false, error: "Note cannot be empty" };

  await addInquiryNote(id, auth.user.id, body.trim());
  revalidatePath(`/admin/inquiries/${id}`);
  return { ok: true };
}
