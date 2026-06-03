import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/types";

export function DestinationCard({
  destination,
  className,
}: {
  destination: Destination;
  className?: string;
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={`group relative block overflow-hidden rounded-lg ${className ?? "aspect-[3/4]"}`}
    >
      <Image
        src={destination.thumbnail}
        alt={destination.name}
        fill
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">
          {destination.country}
        </p>
        <h3 className="mt-1 font-heading text-2xl font-semibold text-cream">
          {destination.name}
        </h3>
        <p className="mt-1 max-w-[18rem] text-sm text-cream/75 opacity-0 transition-all duration-300 group-hover:opacity-100">
          {destination.tagline}
        </p>
      </div>
      <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-cream/15 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
