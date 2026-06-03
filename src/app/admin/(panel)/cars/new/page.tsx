import { AdminPageHeader } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/entity-form";
import { entityConfigs } from "@/lib/admin-entities";

export default function NewCarPage() {
  return (
    <>
      <AdminPageHeader title="New vehicle" subtitle="Add a car to the fleet" />
      <EntityForm config={entityConfigs.cars} id={null} initial={null} />
    </>
  );
}
