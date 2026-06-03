import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/entity-form";
import { entityConfigs } from "@/lib/admin-entities";
import { getDestinationById } from "@/server/repositories/destinations.repo";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getDestinationById(id);
  if (!row) notFound();

  return (
    <>
      <AdminPageHeader title="Edit destination" subtitle={row.name} />
      <EntityForm config={entityConfigs.destinations} id={id} initial={row} />
    </>
  );
}
