import { AdminPageHeader } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/entity-form";
import { entityConfigs } from "@/lib/admin-entities";

export default function NewBlogPage() {
  return (
    <>
      <AdminPageHeader title="New post" subtitle="Write a blog post" />
      <EntityForm config={entityConfigs.blog} id={null} initial={null} />
    </>
  );
}
