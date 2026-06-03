"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/server/auth/session";
import { createMedia, deleteMedia } from "@/server/repositories/media.repo";
import { deleteObject } from "@/server/storage/s3";

const ROLES = ["super_admin", "content_manager"] as const;

export interface ConfirmMediaInput {
  url: string;
  key: string;
  filename: string;
  mimeType: string;
  folder?: string;
  sizeBytes?: number;
}

export async function confirmMediaAction(input: ConfirmMediaInput) {
  const auth = await requireAuth([...ROLES]);
  if (!auth.ok) return { ok: false as const, error: auth.error };

  const row = await createMedia({
    url: input.url,
    key: input.key,
    filename: input.filename,
    mimeType: input.mimeType,
    folder: input.folder ?? "uploads",
    sizeBytes: input.sizeBytes ?? null,
    uploadedById: auth.user.id,
  });
  revalidatePath("/admin/media");
  return { ok: true as const, id: row.id, url: row.url };
}

export async function deleteMediaAction(id: string) {
  const auth = await requireAuth([...ROLES]);
  if (!auth.ok) return { ok: false as const, error: auth.error };

  const row = await deleteMedia(id);
  if (row) await deleteObject(row.key).catch(() => {});
  revalidatePath("/admin/media");
  return { ok: true as const };
}
