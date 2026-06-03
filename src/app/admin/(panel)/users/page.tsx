import { redirect } from "next/navigation";
import { AdminPageHeader, EmptyRow } from "@/components/admin/ui";
import { UserManager } from "@/components/admin/user-manager";
import { getCurrentUser } from "@/server/auth/session";
import { listUsers } from "@/server/repositories/users.repo";
import { isDbConfigured } from "@/lib/env";

export default async function UsersPage() {
  const me = await getCurrentUser();
  if (!me || me.role !== "super_admin") redirect("/admin");

  const users = await listUsers();

  return (
    <>
      <AdminPageHeader title="Users" subtitle="Manage admin team members and roles" />
      {!isDbConfigured ? (
        <div className="rounded-xl border border-line bg-paper">
          <EmptyRow>Connect a database to manage users.</EmptyRow>
        </div>
      ) : (
        <UserManager
          currentUserId={me.id}
          users={users.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            isActive: u.isActive,
            createdAt: u.createdAt.toISOString(),
          }))}
        />
      )}
    </>
  );
}
