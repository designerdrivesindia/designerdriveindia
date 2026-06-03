import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/entity-form";
import { entityConfigs } from "@/lib/admin-entities";
import { getPostById } from "@/server/repositories/blog.repo";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getPostById(id);
  if (!row) notFound();

  return (
    <>
      <AdminPageHeader title="Edit post" subtitle={row.title} />
      <EntityForm config={entityConfigs.blog} id={id} initial={row} />
    </>
  );
}
