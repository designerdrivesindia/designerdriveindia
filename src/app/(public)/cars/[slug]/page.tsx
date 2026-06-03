import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Users, Briefcase, Snowflake, Cog, MapPin, Check, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Gallery } from "@/components/ui/gallery";
import { CarCard } from "@/components/cards/car-card";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import { getCars, getCarBySlug } from "@/server/repositories";

export async function generateStaticParams() {
  const list = await getCars();
  return list.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return { title: "Vehicle not found" };
  return buildMetadata({
    title: `${car.name} — Chauffeur Hire`,
    description: car.description,
    path: `/cars/${car.slug}`,
    image: car.thumbnail,
    keywords: [car.name, car.category, "car rental", "chauffeur"],
  });
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) notFound();

  const specs = [
    { icon: Users, label: "Seating", value: `${car.seats} passengers` },
    { icon: Briefcase, label: "Luggage", value: `${car.luggage} bags` },
    { icon: Snowflake, label: "Climate", value: car.ac ? "Air-conditioned" : "Non-AC" },
    { icon: Cog, label: "Transmission", value: car.transmission },
  ];
  const others = (await getCars()).filter((c) => c.id !== car.id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Car Rentals", path: "/cars" },
          { name: car.name, path: `/cars/${car.slug}` },
        ])}
      />
      <section className="bg-sand pt-32 pb-6 md:pt-36">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Car Rentals", path: "/cars" },
              { name: car.name },
            ]}
          />
        </Container>
      </section>

      <section className="bg-sand pb-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="min-w-0">
              <Gallery images={car.gallery.length ? car.gallery : [{ src: car.thumbnail, alt: car.name }]} />

              <div className="mt-8">
                <Badge variant="solid" size="sm">{car.category}</Badge>
                <h1 className="mt-3 font-heading text-3xl text-ink md:text-4xl">{car.name}</h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">{car.description}</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {specs.map((s) => (
                  <div key={s.label} className="rounded-lg border border-line bg-paper p-4 text-center">
                    <s.icon className="mx-auto size-6 text-gold-deep" />
                    <p className="mt-2 text-xs uppercase tracking-wide text-ink-muted">{s.label}</p>
                    <p className="text-sm font-semibold text-ink">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="font-heading text-xl text-ink">Features</h2>
                  <ul className="mt-4 space-y-2.5">
                    {car.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-heading text-xl text-ink">Available in</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {car.cities.map((c) => (
                      <Badge key={c} variant="outline" size="md"><MapPin className="size-3" /> {c}</Badge>
                    ))}
                  </div>
                  <div className="mt-6 flex items-start gap-2.5 rounded-lg bg-paper p-4">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-success" />
                    <p className="text-sm text-ink-soft">{car.driverInfo}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing + inquiry */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-line bg-paper p-6 shadow-[var(--shadow-soft)]">
                <div className="grid grid-cols-2 gap-4 border-b border-line pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink-muted">Per day</p>
                    <p className="font-heading text-2xl font-semibold text-ink">{formatINR(car.pricePerDay)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink-muted">Per km</p>
                    <p className="font-heading text-2xl font-semibold text-ink">{formatINR(car.pricePerKm)}</p>
                  </div>
                </div>
                <h2 className="mt-5 font-heading text-xl text-ink">Enquire about this vehicle</h2>
                <p className="mt-1 text-sm text-ink-muted">Share your route and dates for a tailored quote.</p>
                <div className="mt-5">
                  <InquiryForm compact source="car" referenceId={car.id} referenceTitle={car.name} />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <h2 className="font-heading text-3xl text-ink">Other vehicles</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
        </Container>
      </section>
    </>
  );
}
