import { NextResponse } from "next/server";
import { login } from "@/server/services/auth.service";
import { rateLimit, clientIp } from "@/server/rate-limit";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`login:${ip}`, { limit: 8, windowMs: 5 * 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const result = await login(body, request.headers.get("user-agent") ?? undefined);
  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: result.status });
  }
  return NextResponse.json({ user: result.user });
}
