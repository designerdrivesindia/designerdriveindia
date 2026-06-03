import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/ui";
import { EntityTable } from "@/components/admin/entity-table";
import { ButtonLink } from "@/components/ui/button";
import { getCars } from "@/server/repositories";
import { formatINR } from "@/lib/utils";

export default async function AdminCarsPage() {
  const cars = await getCars();
  const rows = cars.map((c) => ({
    id: c.id,
    title: c.name,
    subtitle: c.category,
    meta: `${formatINR(c.pricePerDay)}/day · ${c.seats} seats${c.featured ? " · Featured" : ""}`,
  }));

  return (
    <>
      <AdminPageHeader
        title="Cars"
        subtitle={`${cars.length} vehicles`}
        action={
          <ButtonLink href="/admin/cars/new" variant="primary" size="md">
            <Plus className="size-4" /> New vehicle
          </ButtonLink>
        }
      />
      <EntityTable entity="cars" rows={rows} />
    </>
  );
}
