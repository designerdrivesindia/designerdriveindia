import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/ui";
import { EntityTable } from "@/components/admin/entity-table";
import { ButtonLink } from "@/components/ui/button";
import { getDestinations } from "@/server/repositories";

export default async function AdminDestinationsPage() {
  const destinations = await getDestinations();
  const rows = destinations.map((d) => ({
    id: d.id,
    title: d.name,
    subtitle: d.region,
    meta: `${d.country}${d.featured ? " · Featured" : ""}`,
  }));

  return (
    <>
      <AdminPageHeader
        title="Destinations"
        subtitle={`${destinations.length} destinations`}
        action={
          <ButtonLink href="/admin/destinations/new" variant="primary" size="md">
            <Plus className="size-4" /> New destination
          </ButtonLink>
        }
      />
      <EntityTable entity="destinations" rows={rows} />
    </>
  );
}
