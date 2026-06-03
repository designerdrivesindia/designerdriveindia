"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/server/auth/session";
import type { EntityKey } from "@/lib/admin-entities";
import {
  createPackage, updatePackage, deletePackage,
} from "@/server/repositories/packages.repo";
import {
  createDestination, updateDestination, deleteDestination,
} from "@/server/repositories/destinations.repo";
import { createCar, updateCar, deleteCar } from "@/server/repositories/cars.repo";
import { createPost, updatePost, deletePost } from "@/server/repositories/blog.repo";

const CONTENT_ROLES = ["super_admin", "content_manager"] as const;

export type SaveResult = { ok: boolean; id?: string; error?: string };

type Payload = Record<string, unknown>;

const publicPath: Record<EntityKey, string> = {
  packages: "/packages",
  destinations: "/destinations",
  cars: "/cars",
  blog: "/blog",
};

function revalidate(entity: EntityKey, slug?: string) {
  revalidatePath("/admin/" + entity);
  revalidatePath(publicPath[entity]);
  revalidatePath("/");
  if (slug) revalidatePath(`${publicPath[entity]}/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function saveEntity(
  entity: EntityKey,
  id: string | null,
  payload: Payload,
): Promise<SaveResult> {
  const auth = await requireAuth([...CONTENT_ROLES]);
  if (!auth.ok) return { ok: false, error: auth.error };

  try {
    let savedId = id ?? "";
    const slug = typeof payload.slug === "string" ? payload.slug : undefined;

    switch (entity) {
      case "packages": {
        const values = payload as never;
        const row = id ? await updatePackage(id, values) : await createPackage(values);
        savedId = row?.id ?? savedId;
        break;
      }
      case "destinations": {
        const values = payload as never;
        const row = id ? await updateDestination(id, values) : await createDestination(values);
        savedId = row?.id ?? savedId;
        break;
      }
      case "cars": {
        const values = payload as never;
        const row = id ? await updateCar(id, values) : await createCar(values);
        savedId = row?.id ?? savedId;
        break;
      }
      case "blog": {
        // Ensure publishedAt exists on creation.
        const data = { ...payload };
        if (!id && !data.publishedAt) data.publishedAt = new Date();
        const values = data as never;
        const row = id ? await updatePost(id, values) : await createPost(values);
        savedId = row?.id ?? savedId;
        break;
      }
    }

    revalidate(entity, slug);
    return { ok: true, id: savedId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    return { ok: false, error: message };
  }
}

export async function deleteEntity(
  entity: EntityKey,
  id: string,
): Promise<SaveResult> {
  const auth = await requireAuth([...CONTENT_ROLES]);
  if (!auth.ok) return { ok: false, error: auth.error };

  try {
    switch (entity) {
      case "packages": await deletePackage(id); break;
      case "destinations": await deleteDestination(id); break;
      case "cars": await deleteCar(id); break;
      case "blog": await deletePost(id); break;
    }
    revalidate(entity);
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return { ok: false, error: message };
  }
}
