import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MessageCircle, Calendar, Users, Wallet, MapPin, Tag } from "lucide-react";
import { Panel, StatusBadge } from "@/components/admin/ui";
import { InquiryStatusSelect } from "@/components/admin/inquiry-status-select";
import { AssignSelect, AddNoteForm } from "@/components/admin/inquiry-actions";
import { getInquiryById, listInquiryNotes } from "@/server/repositories/inquiries.repo";
import { listUsers } from "@/server/repositories/users.repo";
import { formatDate } from "@/lib/utils";

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [inq, notes, users] = await Promise.all([
    getInquiryById(id),
    listInquiryNotes(id),
    listUsers(),
  ]);
  if (!inq) notFound();

  const userMap = new Map(users.map((u) => [u.id, u.name]));
  const fields = [
    { icon: MapPin, label: "Destination", value: inq.destination },
    { icon: Calendar, label: "Travel date", value: inq.travelDate },
    { icon: Users, label: "Travellers", value: inq.travelers?.toString() },
    { icon: Wallet, label: "Budget", value: inq.budget },
    { icon: Tag, label: "Source", value: inq.source },
    { icon: Tag, label: "Reference", value: inq.referenceTitle },
  ].filter((f) => f.value);

  return (
    <>
      <Link href="/admin/inquiries" className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
        <ArrowLeft className="size-4" /> Back to inquiries
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div className="space-y-6">
          <Panel>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-heading text-2xl text-ink">{inq.fullName}</h1>
                <p className="mt-1 text-sm text-ink-muted">Received {formatDate(inq.createdAt)}</p>
              </div>
              <StatusBadge status={inq.status} />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`mailto:${inq.email}`} className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm text-ink-soft hover:bg-sand-deep">
                <Mail className="size-4 text-gold-deep" /> {inq.email}
              </a>
              <a href={`tel:${inq.phone}`} className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm text-ink-soft hover:bg-sand-deep">
                <Phone className="size-4 text-gold-deep" /> {inq.phone}
              </a>
              {inq.whatsapp && (
                <a href={`https://wa.me/${inq.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-4 py-2 text-sm text-[#1c7a43] hover:bg-[#25D366]/20">
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              )}
            </div>

            {fields.length > 0 && (
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <f.icon className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-ink-muted">{f.label}</dt>
                      <dd className="text-sm capitalize text-ink-soft">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            )}

            {inq.message && (
              <div className="mt-6 rounded-lg bg-sand p-4">
                <p className="text-xs uppercase tracking-wide text-ink-muted">Message</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{inq.message}</p>
              </div>
            )}
          </Panel>

          {/* Notes */}
          <Panel title="Internal notes">
            <AddNoteForm id={inq.id} />
            <div className="mt-6 space-y-4">
              {notes.length === 0 ? (
                <p className="text-sm text-ink-muted">No notes yet.</p>
              ) : (
                notes.map((n) => (
                  <div key={n.id} className="rounded-lg border border-line p-4">
                    <p className="text-sm text-ink-soft">{n.body}</p>
                    <p className="mt-2 text-xs text-ink-muted">
                      {n.authorId ? userMap.get(n.authorId) ?? "Team" : "System"} · {formatDate(n.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Panel>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Panel title="Manage">
            <label className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Status</label>
            <div className="mt-2">
              <InquiryStatusSelect id={inq.id} status={inq.status} className="w-full !rounded-md !py-2.5 !text-sm" />
            </div>
            <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-ink-muted">Assigned to</label>
            <div className="mt-2">
              <AssignSelect
                id={inq.id}
                assignedToId={inq.assignedToId}
                users={users.map((u) => ({ id: u.id, name: u.name }))}
              />
            </div>
          </Panel>
        </aside>
      </div>
    </>
  );
}
