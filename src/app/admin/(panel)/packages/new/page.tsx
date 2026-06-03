import { AdminPageHeader } from "@/components/admin/ui";
import { EntityForm } from "@/components/admin/entity-form";
import { entityConfigs } from "@/lib/admin-entities";

export default function NewPackagePage() {
  return (
    <>
      <AdminPageHeader title="New package" subtitle="Create a tour package" />
      <EntityForm config={entityConfigs.packages} id={null} initial={null} />
    </>
  );
}
