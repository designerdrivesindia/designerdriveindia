import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/entity-form";
import { entityConfigs } from "@/lib/admin-entities";
import { getCarById } from "@/server/repositories/cars.repo";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getCarById(id);
  if (!row) notFound();

  return (
    <>
      <AdminPageHeader title="Edit vehicle" subtitle={row.name} />
      <EntityForm config={entityConfigs.cars} id={id} initial={row} />
    </>
  );
}
