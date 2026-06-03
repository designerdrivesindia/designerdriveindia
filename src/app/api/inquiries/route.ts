import { NextResponse } from "next/server";
import { submitInquiry } from "@/server/services/inquiry.service";
import { listInquiries } from "@/server/repositories/inquiries.repo";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { requireAuth } from "@/server/auth/session";

/**
 * POST /api/inquiries — public lead capture.
 * Rate-limited per IP; honeypot + server-side validation in the service.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`inquiry:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const result = await submitInquiry(body);
  if (!result.ok) {
    return NextResponse.json(
      { message: result.error, issues: result.issues },
      { status: 422 },
    );
  }

  return NextResponse.json(
    { id: result.id, createdAt: result.createdAt },
    { status: 201 },
  );
}

/**
 * GET /api/inquiries — admin-only list (CRM). Supports ?status= &source= &page=.
 */
export async function GET(request: Request) {
  const auth = await requireAuth(["super_admin", "sales_manager"]);
  if (!auth.ok) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const result = await listInquiries({
    status: (searchParams.get("status") as never) ?? undefined,
    source: (searchParams.get("source") as never) ?? undefined,
    page: Number(searchParams.get("page") ?? 1),
    pageSize: Number(searchParams.get("pageSize") ?? 20),
  });

  return NextResponse.json(result);
}
