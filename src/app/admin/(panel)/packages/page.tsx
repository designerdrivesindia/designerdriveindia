import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/ui";
import { EntityTable } from "@/components/admin/entity-table";
import { ButtonLink } from "@/components/ui/button";
import { getPackages } from "@/server/repositories";
import { formatINR } from "@/lib/utils";

export default async function AdminPackagesPage() {
  const packages = await getPackages();
  const rows = packages.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: `${p.state}, ${p.country}`,
    meta: `${formatINR(p.startingPrice)} · ${p.durationNights}N/${p.durationDays}D${p.featured ? " · Featured" : ""}`,
  }));

  return (
    <>
      <AdminPageHeader
        title="Packages"
        subtitle={`${packages.length} tour packages`}
        action={
          <ButtonLink href="/admin/packages/new" variant="primary" size="md">
            <Plus className="size-4" /> New package
          </ButtonLink>
        }
      />
      <EntityTable entity="packages" rows={rows} />
    </>
  );
}
