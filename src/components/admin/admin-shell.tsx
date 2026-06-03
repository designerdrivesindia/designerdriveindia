"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Package,
  MapPin,
  Car,
  Newspaper,
  Image as ImageIcon,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navForRole, roleLabels, type Role } from "@/lib/admin-nav";
import { useUIStore } from "@/store/ui-store";

const icons: Record<string, LucideIcon> = {
  LayoutDashboard, Inbox, Package, MapPin, Car, Newspaper, Image: ImageIcon, Users, Settings,
};

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export function AdminShell({
  user,
  newInquiries = 0,
  children,
}: {
  user: AdminUser;
  newInquiries?: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = navForRole(user.role);

  return (
    <div className="min-h-screen bg-sand/60">
      {/* Sidebar */}
      <Sidebar
        nav={nav}
        pathname={pathname}
        newInquiries={newInquiries}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main column */}
      <div className="lg:pl-64">
        <Topbar user={user} onMenu={() => setMobileOpen(true)} newInquiries={newInquiries} />
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({
  nav,
  pathname,
  newInquiries,
  mobileOpen,
  onClose,
}: {
  nav: ReturnType<typeof navForRole>;
  pathname: string;
  newInquiries: number;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-ink-soft/30 bg-ink text-cream transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link href="/admin" className="font-heading text-lg font-semibold text-cream">
            Designer Drives
          </Link>
          <button onClick={onClose} className="text-cream/70 lg:hidden" aria-label="Close menu">
            <X className="size-5" />
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1 px-3">
          {nav.map((item) => {
            const Icon = icons[item.icon] ?? LayoutDashboard;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-gold text-paper"
                    : "text-cream/70 hover:bg-cream/5 hover:text-cream",
                )}
              >
                <Icon className="size-[1.15rem]" />
                <span className="flex-1">{item.label}</span>
                {item.href === "/admin/inquiries" && newInquiries > 0 && (
                  <span className="rounded-full bg-danger px-1.5 py-0.5 text-[0.65rem] font-semibold text-white">
                    {newInquiries}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-3 bottom-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-cream/60 hover:bg-cream/5 hover:text-cream"
          >
            <ExternalLink className="size-4" /> View live site
          </Link>
        </div>
      </aside>
    </>
  );
}

function Topbar({
  user,
  onMenu,
  newInquiries,
}: {
  user: AdminUser;
  onMenu: () => void;
  newInquiries: number;
}) {
  const router = useRouter();
  const toast = useUIStore((s) => s.toast);
  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast({ variant: "success", title: "Signed out" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-cream/90 px-4 backdrop-blur md:px-8">
      <button onClick={onMenu} className="text-ink lg:hidden" aria-label="Open menu">
        <Menu className="size-6" />
      </button>

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
        <input
          placeholder="Search inquiries, packages…"
          className="h-10 w-full rounded-full border border-line bg-paper pl-9 pr-4 text-sm text-ink placeholder:text-ink-muted/70 focus:border-gold focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/admin/inquiries?status=new"
          className="relative flex size-10 items-center justify-center rounded-full text-ink-soft hover:bg-ink/5"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          {newInquiries > 0 && (
            <span className="absolute right-2 top-2 size-2 rounded-full bg-danger" />
          )}
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-ink/5"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-cream">
              {user.name.slice(0, 1).toUpperCase()}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-ink">{user.name}</span>
              <span className="block text-xs leading-tight text-ink-muted">{roleLabels[user.role]}</span>
            </span>
            <ChevronDown className="size-4 text-ink-muted" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-52 rounded-lg border border-line bg-paper p-1.5 shadow-[var(--shadow-lift)]">
                <div className="border-b border-line px-3 py-2">
                  <p className="text-sm font-medium text-ink">{user.name}</p>
                  <p className="truncate text-xs text-ink-muted">{user.email}</p>
                </div>
                <Link
                  href="/admin/settings"
                  className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-sand"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings className="size-4" /> Settings
                </Link>
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-danger hover:bg-danger/5"
                >
                  <LogOut className="size-4" /> Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
