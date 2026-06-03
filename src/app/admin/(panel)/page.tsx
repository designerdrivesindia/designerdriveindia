import Link from "next/link";
import { Inbox, TrendingUp, Package as PackageIcon, CheckCircle2, ArrowRight } from "lucide-react";
import { AdminPageHeader, Panel, StatCard, StatusBadge, EmptyRow } from "@/components/admin/ui";
import { BarList, Donut } from "@/components/admin/charts";
import { formatDate } from "@/lib/utils";
import {
  getInquiryStats,
  getRecentInquiries,
  getInquirySourceBreakdown,
  getTopDestinations,
} from "@/server/repositories/inquiries.repo";
import { getPackages, getDestinations, getCars, getBlogPosts } from "@/server/repositories";

const STATUS_COLORS: Record<string, string> = {
  new: "#3b82f6",
  contacted: "#f59e0b",
  negotiation: "#a855f7",
  converted: "#22c55e",
  closed: "#a1a1aa",
};
const STATUS_ORDER = ["new", "contacted", "negotiation", "converted", "closed"] as const;
const SOURCE_COLORS = ["#b8924f", "#1c1b19", "#9a7838", "#6b665e", "#c9a86a"];

export default async function AdminDashboard() {
  const [stats, recent, sources, topDest, pkgs, dests, cars, posts] = await Promise.all([
    getInquiryStats(),
    getRecentInquiries(6),
    getInquirySourceBreakdown(),
    getTopDestinations(5),
    getPackages(),
    getDestinations(),
    getCars(),
    getBlogPosts(),
  ]);

  const converted = stats.byStatus?.converted ?? 0;
  const conversionRate = stats.total ? Math.round((converted / stats.total) * 100) : 0;

  const statusData = STATUS_ORDER.map((s) => ({
    label: s,
    value: stats.byStatus?.[s] ?? 0,
    color: STATUS_COLORS[s],
  }));

  const sourceSegments = sources.map((s, i) => ({
    label: s.source,
    value: s.value,
    color: SOURCE_COLORS[i % SOURCE_COLORS.length],
  }));

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Overview of leads and content across Designer Drives India."
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total inquiries" value={stats.total} hint={`${stats.last30Days} in last 30 days`} icon={<Inbox className="size-5" />} href="/admin/inquiries" />
        <StatCard label="New leads" value={stats.byStatus?.new ?? 0} hint="Awaiting first contact" icon={<TrendingUp className="size-5" />} href="/admin/inquiries?status=new" />
        <StatCard label="Converted" value={converted} hint={`${conversionRate}% conversion rate`} icon={<CheckCircle2 className="size-5" />} href="/admin/inquiries?status=converted" />
        <StatCard label="Active packages" value={pkgs.length} hint={`${dests.length} destinations · ${cars.length} cars · ${posts.length} posts`} icon={<PackageIcon className="size-5" />} href="/admin/packages" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Pipeline */}
        <Panel title="Lead pipeline" className="lg:col-span-2">
          <BarList data={statusData} />
        </Panel>

        {/* Source breakdown */}
        <Panel title="By source">
          {sourceSegments.length ? (
            <Donut segments={sourceSegments} />
          ) : (
            <EmptyRow>No inquiries yet.</EmptyRow>
          )}
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent inquiries */}
        <Panel
          title="Recent inquiries"
          className="lg:col-span-2"
          action={
            <Link href="/admin/inquiries" className="inline-flex items-center gap-1 text-sm font-medium text-gold-deep hover:text-ink">
              View all <ArrowRight className="size-4" />
            </Link>
          }
        >
          {recent.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-ink-muted">
                  <tr>
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Destination</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {recent.map((inq) => (
                    <tr key={inq.id} className="hover:bg-sand/50">
                      <td className="py-3">
                        <Link href={`/admin/inquiries/${inq.id}`} className="font-medium text-ink hover:text-gold-deep">
                          {inq.fullName}
                        </Link>
                        <p className="text-xs text-ink-muted">{inq.email}</p>
                      </td>
                      <td className="py-3 text-ink-soft">{inq.destination ?? "—"}</td>
                      <td className="py-3"><StatusBadge status={inq.status} /></td>
                      <td className="py-3 text-ink-muted">{formatDate(inq.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyRow>No inquiries yet — they&apos;ll appear here as leads come in.</EmptyRow>
          )}
        </Panel>

        {/* Top destinations */}
        <Panel title="Top destinations">
          {topDest.length ? (
            <BarList data={topDest.map((d) => ({ label: d.destination, value: d.value }))} />
          ) : (
            <EmptyRow>No destination data yet.</EmptyRow>
          )}
        </Panel>
      </div>
    </>
  );
}
