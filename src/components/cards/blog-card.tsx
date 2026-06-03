import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function BlogCard({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className={`relative block overflow-hidden rounded-lg ${compact ? "aspect-[16/10]" : "aspect-[16/11]"}`}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <Badge variant="light" size="sm" className="absolute left-3 top-3">{post.category}</Badge>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs text-ink-muted">
          {formatDate(post.publishedAt)} · {post.readMinutes} min read
        </p>
        <h3 className="mt-2 font-heading text-xl leading-snug text-ink">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-gold-deep">
            {post.title}
          </Link>
        </h3>
        {!compact && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">
            {post.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}
