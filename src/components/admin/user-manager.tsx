"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";
import { Input, Select, FormField } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/ui";
import { useUIStore } from "@/store/ui-store";
import { createUserAction, toggleUserActiveAction } from "@/server/actions/users.actions";
import { roleLabels, type Role } from "@/lib/admin-nav";
import { formatDate } from "@/lib/utils";

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}

export function UserManager({
  users,
  currentUserId,
}: {
  users: AdminUserItem[];
  currentUserId: string;
}) {
  const router = useRouter();
  const toast = useUIStore((s) => s.toast);
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "content_manager" as Role });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createUserAction(form);
      if (!res.ok) {
        toast({ variant: "error", title: "Could not create user", description: res.error });
      } else {
        toast({ variant: "success", title: "User created" });
        setForm({ name: "", email: "", password: "", role: "content_manager" });
        router.refresh();
      }
    });
  }

  function toggle(u: AdminUserItem) {
    startTransition(async () => {
      const res = await toggleUserActiveAction(u.id, !u.isActive);
      if (!res.ok) toast({ variant: "error", title: "Action failed", description: res.error });
      else router.refresh();
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* List */}
      <div className="overflow-hidden rounded-xl border border-line bg-paper">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-sand/50 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">User</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-5 py-3">
                  <p className="font-medium text-ink">{u.name}</p>
                  <p className="text-xs text-ink-muted">{u.email} · joined {formatDate(u.createdAt)}</p>
                </td>
                <td className="px-5 py-3 text-ink-soft">{roleLabels[u.role]}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={u.isActive ? "active" : "inactive"} />
                </td>
                <td className="px-5 py-3 text-right">
                  {u.id === currentUserId ? (
                    <span className="text-xs text-ink-muted">You</span>
                  ) : (
                    <button
                      onClick={() => toggle(u)}
                      disabled={pending}
                      className="text-sm font-medium text-gold-deep hover:text-ink"
                    >
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create */}
      <aside className="rounded-xl border border-line bg-paper p-6">
        <h2 className="font-heading text-lg text-ink">Add team member</h2>
        <form onSubmit={submit} className="mt-4 space-y-4">
          <FormField label="Name" htmlFor="u-name" required>
            <Input id="u-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </FormField>
          <FormField label="Email" htmlFor="u-email" required>
            <Input id="u-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </FormField>
          <FormField label="Password" htmlFor="u-pass" required>
            <Input id="u-pass" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </FormField>
          <FormField label="Role" htmlFor="u-role" required>
            <Select id="u-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
              <option value="content_manager">Content Manager</option>
              <option value="sales_manager">Sales Manager</option>
              <option value="super_admin">Super Admin</option>
            </Select>
          </FormField>
          <Button type="submit" variant="primary" size="md" disabled={pending} className="w-full">
            {pending ? <Loader2 className="size-4 animate-spin" /> : <UserPlus className="size-4" />}
            Create user
          </Button>
        </form>
      </aside>
    </div>
  );
}
