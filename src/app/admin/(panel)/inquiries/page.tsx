import Link from "next/link";
import { ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
import { AdminPageHeader, Panel, EmptyRow } from "@/components/admin/ui";
import { InquiryFilters } from "@/components/admin/inquiry-filters";
import { InquiryStatusSelect } from "@/components/admin/inquiry-status-select";
import { listInquiries, type InquiryStatus } from "@/server/repositories/inquiries.repo";
import { formatDate } from "@/lib/utils";

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; source?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page ?? 1);
  const { data, total, pageSize } = await listInquiries({
    status: (sp.status as InquiryStatus) || undefined,
    source: (sp.source as never) || undefined,
    page,
    pageSize: 20,
  });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (sp.status) params.set("status", sp.status);
    params.set("page", String(p));
    return `/admin/inquiries?${params.toString()}`;
  };

  return (
    <>
      <AdminPageHeader title="Inquiries" subtitle={`${total} total lead${total === 1 ? "" : "s"}`} />

      <div className="mb-5">
        <InquiryFilters />
      </div>

      <Panel className="!p-0">
        {data.length === 0 ? (
          <EmptyRow>No inquiries match this filter.</EmptyRow>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-sand/50 text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Lead</th>
                  <th className="px-5 py-3 font-semibold">Trip</th>
                  <th className="px-5 py-3 font-semibold">Source</th>
                  <th className="px-5 py-3 font-semibold">Received</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.map((inq) => (
                  <tr key={inq.id} className="group hover:bg-sand/40">
                    <td className="px-5 py-3">
                      <Link href={`/admin/inquiries/${inq.id}`} className="font-medium text-ink group-hover:text-gold-deep">
                        {inq.fullName}
                      </Link>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-ink-muted">
                        <span className="inline-flex items-center gap-1"><Mail className="size-3" />{inq.email}</span>
                        <span className="inline-flex items-center gap-1"><Phone className="size-3" />{inq.phone}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-ink-soft">
                      {inq.destination ?? "—"}
                      {inq.travelers ? <span className="text-ink-muted"> · {inq.travelers} pax</span> : null}
                    </td>
                    <td className="px-5 py-3 capitalize text-ink-muted">{inq.source}</td>
                    <td className="px-5 py-3 text-ink-muted">{formatDate(inq.createdAt)}</td>
                    <td className="px-5 py-3">
                      <InquiryStatusSelect id={inq.id} status={inq.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-ink-muted">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <Link
              href={pageHref(Math.max(1, page - 1))}
              aria-disabled={page <= 1}
              className={`flex size-9 items-center justify-center rounded-full border border-line-strong ${page <= 1 ? "pointer-events-none opacity-40" : "hover:border-ink"}`}
            >
              <ChevronLeft className="size-4" />
            </Link>
            <Link
              href={pageHref(Math.min(totalPages, page + 1))}
              aria-disabled={page >= totalPages}
              className={`flex size-9 items-center justify-center rounded-full border border-line-strong ${page >= totalPages ? "pointer-events-none opacity-40" : "hover:border-ink"}`}
            >
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
