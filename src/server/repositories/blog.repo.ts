import "server-only";
import { cache } from "react";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/server/db/client";
import { blogPosts } from "@/server/db/schema";
import type { BlogPostRow } from "@/server/db/schema";
import type { BlogPost } from "@/types";
import { blogPosts as seedPosts } from "@/data/blog";

function toDomain(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverImage: row.coverImage,
    category: row.category,
    tags: row.tags,
    author: row.author,
    publishedAt: row.publishedAt.toISOString(),
    readMinutes: row.readMinutes,
    content: row.content,
    featured: row.featured,
    seo: row.seo ?? undefined,
  };
}

const sortByDateDesc = (a: BlogPost, b: BlogPost) =>
  +new Date(b.publishedAt) - +new Date(a.publishedAt);

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  if (!db) {
    return [...seedPosts].sort(sortByDateDesc);
  }
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));
  return rows.map(toDomain);
});

export const getFeaturedPosts = cache(async (): Promise<BlogPost[]> => {
  const all = await getBlogPosts();
  return all.filter((p) => p.featured);
});

export const getPostBySlug = cache(
  async (slug: string): Promise<BlogPost | undefined> => {
    if (!db) return seedPosts.find((p) => p.slug === slug);
    const [row] = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")))
      .limit(1);
    return row ? toDomain(row) : undefined;
  },
);

export async function getRelatedPosts(
  post: { slug: string; category: string },
  limit = 3,
): Promise<BlogPost[]> {
  const all = await getBlogPosts();
  return all
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
}

/* ---------- Admin CRUD (includes drafts) ---------- */
type NewBlogRow = typeof blogPosts.$inferInsert;

export async function getAllPostsAdmin(): Promise<BlogPostRow[]> {
  if (!db) return [];
  return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getPostById(id: string): Promise<BlogPostRow | undefined> {
  if (!db) return undefined;
  const [row] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return row;
}

export async function createPost(values: NewBlogRow): Promise<BlogPostRow> {
  if (!db) throw new Error("Database not configured");
  const [row] = await db.insert(blogPosts).values(values).returning();
  return row;
}

export async function updatePost(id: string, patch: Partial<NewBlogRow>) {
  if (!db) throw new Error("Database not configured");
  const [row] = await db
    .update(blogPosts)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(blogPosts.id, id))
    .returning();
  return row;
}

export async function deletePost(id: string): Promise<void> {
  if (!db) throw new Error("Database not configured");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}
