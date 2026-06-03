import type { UserRow } from "@/server/db/schema";

export type Role = UserRow["role"];

export interface AdminNavItem {
  label: string;
  href: string;
  icon: string; // lucide icon name
  roles?: Role[]; // visible to these roles (undefined = all)
}

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "Inbox", roles: ["super_admin", "sales_manager"] },
  { label: "Packages", href: "/admin/packages", icon: "Package", roles: ["super_admin", "content_manager"] },
  { label: "Destinations", href: "/admin/destinations", icon: "MapPin", roles: ["super_admin", "content_manager"] },
  { label: "Cars", href: "/admin/cars", icon: "Car", roles: ["super_admin", "content_manager"] },
  { label: "Blog", href: "/admin/blog", icon: "Newspaper", roles: ["super_admin", "content_manager"] },
  { label: "Media", href: "/admin/media", icon: "Image", roles: ["super_admin", "content_manager"] },
  { label: "Users", href: "/admin/users", icon: "Users", roles: ["super_admin"] },
  { label: "Settings", href: "/admin/settings", icon: "Settings", roles: ["super_admin"] },
];

export const roleLabels: Record<Role, string> = {
  super_admin: "Super Admin",
  content_manager: "Content Manager",
  sales_manager: "Sales Manager",
};

/** Filter nav by the current user's role. */
export function navForRole(role: Role): AdminNavItem[] {
  return adminNav.filter((item) => !item.roles || item.roles.includes(role));
}
