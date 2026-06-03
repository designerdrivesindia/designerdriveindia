import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/entity-form";
import { entityConfigs } from "@/lib/admin-entities";
import { getPackageById } from "@/server/repositories/packages.repo";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getPackageById(id);
  if (!row) notFound();

  return (
    <>
      <AdminPageHeader title="Edit package" subtitle={row.title} />
      <EntityForm config={entityConfigs.packages} id={id} initial={row} />
    </>
  );
}
