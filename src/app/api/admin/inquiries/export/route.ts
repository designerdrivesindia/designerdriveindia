import { requireAuth } from "@/server/auth/session";
import { listInquiries, type InquiryStatus } from "@/server/repositories/inquiries.repo";

const HEADERS = [
  "Name", "Email", "Phone", "WhatsApp", "Destination", "Travel Date",
  "Travelers", "Budget", "Source", "Status", "Message", "Received",
];

function csvCell(value: unknown): string {
  const s = value == null ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const auth = await requireAuth(["super_admin", "sales_manager"]);
  if (!auth.ok) {
    return new Response(auth.error, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const status = (searchParams.get("status") as InquiryStatus) || undefined;

  // Export up to 5000 rows.
  const { data } = await listInquiries({ status, page: 1, pageSize: 5000 });

  const rows = data.map((i) =>
    [
      i.fullName, i.email, i.phone, i.whatsapp, i.destination, i.travelDate,
      i.travelers, i.budget, i.source, i.status, i.message,
      i.createdAt.toISOString(),
    ].map(csvCell).join(","),
  );

  const csv = [HEADERS.map(csvCell).join(","), ...rows].join("\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inquiries-${date}.csv"`,
    },
  });
}
