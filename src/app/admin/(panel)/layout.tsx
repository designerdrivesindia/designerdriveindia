import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth/session";
import { getInquiryStats } from "@/server/repositories/inquiries.repo";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const stats = await getInquiryStats();
  const newInquiries = stats.byStatus?.new ?? 0;

  return (
    <AdminShell user={user} newInquiries={newInquiries}>
      {children}
    </AdminShell>
  );
}
