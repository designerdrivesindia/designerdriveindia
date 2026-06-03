import { AdminPageHeader } from "@/components/admin/ui";
import { MediaManager } from "@/components/admin/media-manager";
import { listMedia } from "@/server/repositories/media.repo";
import { isS3Configured } from "@/server/storage/s3";

export default async function MediaPage() {
  const items = await listMedia();
  return (
    <>
      <AdminPageHeader title="Media library" subtitle="Upload and manage images stored on S3" />
      <MediaManager
        enabled={isS3Configured}
        initial={items.map((m) => ({
          id: m.id,
          url: m.url,
          filename: m.filename,
          mimeType: m.mimeType,
        }))}
      />
    </>
  );
}
