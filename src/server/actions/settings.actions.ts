"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/server/auth/session";
import { upsertSetting } from "@/server/repositories/settings.repo";

export interface SiteSettings {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  seoTitle: string;
  seoDescription: string;
}

export async function saveSiteSettingsAction(value: SiteSettings) {
  const auth = await requireAuth(["super_admin"]);
  if (!auth.ok) return { ok: false as const, error: auth.error };

  try {
    await upsertSetting("site", value);
    revalidatePath("/admin/settings");
    revalidatePath("/", "layout");
    return { ok: true as const };
  } catch (err) {
    return { ok: false as const, error: err instanceof Error ? err.message : "Save failed" };
  }
}
