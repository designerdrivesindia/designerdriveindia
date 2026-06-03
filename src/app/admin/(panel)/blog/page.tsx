import { Plus } from "lucide-react";
import { AdminPageHeader, EmptyRow } from "@/components/admin/ui";
import { EntityTable } from "@/components/admin/entity-table";
import { ButtonLink } from "@/components/ui/button";
import { getAllPostsAdmin } from "@/server/repositories/blog.repo";
import { isDbConfigured } from "@/lib/env";
import { formatDate } from "@/lib/utils";

export default async function AdminBlogPage() {
  const posts = await getAllPostsAdmin();
  const rows = posts.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.category,
    status: p.status,
    meta: formatDate(p.publishedAt),
  }));

  return (
    <>
      <AdminPageHeader
        title="Blog posts"
        subtitle={`${posts.length} posts (incl. drafts)`}
        action={
          <ButtonLink href="/admin/blog/new" variant="primary" size="md">
            <Plus className="size-4" /> New post
          </ButtonLink>
        }
      />
      {!isDbConfigured ? (
        <div className="rounded-xl border border-line bg-paper">
          <EmptyRow>Connect a database to manage blog posts (incl. drafts).</EmptyRow>
        </div>
      ) : (
        <EntityTable entity="blog" rows={rows} />
      )}
    </>
  );
}
