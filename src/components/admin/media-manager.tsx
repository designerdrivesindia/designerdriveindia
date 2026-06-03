"use client";

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadCloud, Trash2, Copy, Loader2, Check } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { confirmMediaAction, deleteMediaAction } from "@/server/actions/media.actions";

export interface MediaItem {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
}

export function MediaManager({
  initial,
  enabled,
}: {
  initial: MediaItem[];
  enabled: boolean;
}) {
  const router = useRouter();
  const toast = useUIStore((s) => s.toast);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const presignRes = await fetch("/api/admin/media/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, contentType: file.type, folder: "uploads" }),
        });
        const presign = await presignRes.json();
        if (!presignRes.ok) {
          toast({ variant: "error", title: "Upload failed", description: presign.message });
          continue;
        }
        const put = await fetch(presign.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!put.ok) {
          toast({ variant: "error", title: `Could not upload ${file.name}` });
          continue;
        }
        await confirmMediaAction({
          url: presign.url,
          key: presign.key,
          filename: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
        });
      }
      toast({ variant: "success", title: "Upload complete" });
      router.refresh();
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function copy(item: MediaItem) {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function remove(item: MediaItem) {
    if (!confirm(`Delete ${item.filename}?`)) return;
    startTransition(async () => {
      const res = await deleteMediaAction(item.id);
      if (!res.ok) toast({ variant: "error", title: "Could not delete", description: res.error });
      else {
        toast({ variant: "success", title: "Deleted" });
        router.refresh();
      }
    });
  }

  return (
    <div>
      <label
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-line-strong bg-paper px-6 py-12 text-center transition-colors hover:border-gold ${!enabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          disabled={!enabled || uploading}
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <Loader2 className="size-8 animate-spin text-gold-deep" />
        ) : (
          <UploadCloud className="size-8 text-gold-deep" />
        )}
        <p className="mt-3 font-medium text-ink">
          {enabled ? "Click to upload images" : "S3 storage not configured"}
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          {enabled ? "PNG, JPG, WEBP — uploaded directly to S3" : "Set AWS_* env vars to enable uploads"}
        </p>
      </label>

      {initial.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {initial.map((item) => (
            <figure key={item.id} className="group overflow-hidden rounded-lg border border-line bg-paper">
              <div className="relative aspect-square bg-sand">
                <Image src={item.url} alt={item.filename} fill sizes="200px" className="object-cover" unoptimized />
              </div>
              <figcaption className="flex items-center justify-between gap-2 p-2">
                <span className="truncate text-xs text-ink-muted" title={item.filename}>{item.filename}</span>
                <span className="flex shrink-0 gap-1">
                  <button onClick={() => copy(item)} className="text-ink-muted hover:text-ink" aria-label="Copy URL">
                    {copiedId === item.id ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                  </button>
                  <button onClick={() => remove(item)} disabled={pending} className="text-danger hover:opacity-70" aria-label="Delete">
                    <Trash2 className="size-4" />
                  </button>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
