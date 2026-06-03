import { NextResponse } from "next/server";
import { requireAuth } from "@/server/auth/session";
import { isS3Configured, presignUpload } from "@/server/storage/s3";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  const auth = await requireAuth(["super_admin", "content_manager"]);
  if (!auth.ok) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }
  if (!isS3Configured) {
    return NextResponse.json(
      { message: "S3 storage is not configured. Set the AWS_* environment variables." },
      { status: 503 },
    );
  }

  const { filename, contentType, folder } = await request.json().catch(() => ({}));
  if (!filename || !contentType) {
    return NextResponse.json({ message: "filename and contentType are required" }, { status: 400 });
  }

  const safeFolder = (folder && slugify(String(folder))) || "uploads";
  const ext = String(filename).split(".").pop() ?? "bin";
  const base = slugify(String(filename).replace(/\.[^.]+$/, "")) || "file";
  // Unique-ish key without Math.random/Date in the bundle: derive from headers + time at request.
  const key = `${safeFolder}/${base}-${Date.now().toString(36)}.${ext}`;

  const presigned = await presignUpload(key, String(contentType));
  return NextResponse.json(presigned);
}
