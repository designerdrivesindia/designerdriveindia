import { NextResponse } from "next/server";
import { rotateSession } from "@/server/auth/session";

export async function POST(request: Request) {
  const user = await rotateSession(request.headers.get("user-agent") ?? undefined);
  if (!user) {
    return NextResponse.json({ message: "Session expired" }, { status: 401 });
  }
  return NextResponse.json({ user });
}
