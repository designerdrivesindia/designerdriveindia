import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import type { Package } from "@/types";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.thumbnail}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {pkg.tripTypes.slice(0, 1).map((t) => (
            <Badge key={t} variant="light" size="sm">{t}</Badge>
          ))}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-cream">
          <MapPin className="size-3.5" />
          <span className="text-xs font-medium">{pkg.state}, {pkg.country}</span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {pkg.durationNights}N / {pkg.durationDays}D
          </span>
          <StarRating rating={pkg.rating} size={12} />
        </div>

        <h3 className="mt-2.5 font-heading text-xl leading-snug text-ink">
          <Link href={`/packages/${pkg.slug}`} className="transition-colors hover:text-gold-deep">
            {pkg.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {pkg.summary}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-wide text-ink-muted">From</p>
            <p className="font-heading text-xl font-semibold text-ink">
              {formatINR(pkg.startingPrice)}
              <span className="ml-1 text-xs font-normal text-ink-muted">/ person</span>
            </p>
          </div>
          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-deep transition-colors hover:text-ink"
          >
            View <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
