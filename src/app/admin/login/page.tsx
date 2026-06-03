import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth/session";
import { isDbConfigured } from "@/lib/env";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-heading text-3xl font-semibold text-cream">
            Designer Drives India
          </p>
          <p className="mt-1 text-sm uppercase tracking-[0.25em] text-gold-soft">
            Admin Panel
          </p>
        </div>

        <div className="rounded-2xl bg-cream p-8 shadow-[var(--shadow-lift)]">
          <h1 className="font-heading text-2xl text-ink">Sign in</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Enter your credentials to access the dashboard.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>

          {!isDbConfigured && (
            <p className="mt-6 rounded-md bg-sand px-3 py-2 text-xs text-ink-muted">
              Database not connected. Set <code>DATABASE_URL</code> and run{" "}
              <code>npm run db:seed</code> to create the admin user.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
