import { AdminPageHeader } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/entity-form";
import { entityConfigs } from "@/lib/admin-entities";

export default function NewDestinationPage() {
  return (
    <>
      <AdminPageHeader title="New destination" subtitle="Create a destination" />
      <EntityForm config={entityConfigs.destinations} id={null} initial={null} />
    </>
  );
}
