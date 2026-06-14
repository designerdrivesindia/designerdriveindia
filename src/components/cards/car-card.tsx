import Link from "next/link";
import Image from "next/image";
import { Users, Briefcase, Snowflake, Cog } from "lucide-react";
import type { Car } from "@/types";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function CarCard({ car }: { car: Car }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link href={`/cars/${car.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-sand">
        <Image
          src={car.thumbnail}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <Badge variant="solid" size="sm" className="absolute left-3 top-3">{car.category}</Badge>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl text-ink">
          <Link href={`/cars/${car.slug}`} className="transition-colors hover:text-gold-deep">
            {car.name}
          </Link>
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-ink-muted">
          <span className="inline-flex items-center gap-1.5"><Users className="size-4 text-gold-deep" /> {car.seats} seats</span>
          <span className="inline-flex items-center gap-1.5"><Briefcase className="size-4 text-gold-deep" /> {car.luggage} bags</span>
          <span className="inline-flex items-center gap-1.5"><Snowflake className="size-4 text-gold-deep" /> {car.ac ? "AC" : "Non-AC"}</span>
          <span className="inline-flex items-center gap-1.5"><Cog className="size-4 text-gold-deep" /> {car.transmission}</span>
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          {/* <div>
            <p className="text-[0.7rem] uppercase tracking-wide text-ink-muted">From</p>
            <p className="font-heading text-lg font-semibold text-ink">
              {formatINR(car.pricePerDay)}
              <span className="ml-1 text-xs font-normal text-ink-muted">/ day</span>
            </p>
          </div> */}
          <Link
            href={`/cars/${car.slug}`}
            className="text-sm font-semibold text-gold-deep transition-colors hover:text-ink"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
