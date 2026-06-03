import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Lightbulb, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Gallery } from "@/components/ui/gallery";
import { PackageCard } from "@/components/cards/package-card";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, destinationSchema, breadcrumbSchema } from "@/lib/seo";
import {
  getDestinations,
  getDestinationBySlug,
  getPackagesByDestination,
} from "@/server/repositories";

export async function generateStaticParams() {
  const list = await getDestinations();
  return list.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) return { title: "Destination not found" };
  return buildMetadata({
    title: `${dest.name} Travel Guide`,
    description: dest.overview.slice(0, 155),
    path: `/destinations/${dest.slug}`,
    image: dest.heroImage,
    keywords: [dest.name, dest.country, "travel guide", "tour packages", ...dest.tripTypes],
  });
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) notFound();

  const relatedPackages = await getPackagesByDestination(dest.slug);

  return (
    <>
      <JsonLd
        data={[
          destinationSchema(dest),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            { name: dest.name, path: `/destinations/${dest.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={dest.country}
        title={dest.name}
        intro={dest.tagline}
        image={dest.heroImage}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: dest.name },
        ]}
      />

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="min-w-0 space-y-12">
              <div>
                <div className="flex flex-wrap gap-2">
                  {dest.tripTypes.map((t) => <Badge key={t} variant="gold" size="sm">{t}</Badge>)}
                </div>
                <h2 className="mt-5 font-heading text-2xl text-ink md:text-3xl">Overview</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{dest.overview}</p>
                <div className="mt-6 flex items-start gap-3 rounded-lg bg-sand p-4">
                  <CalendarDays className="mt-0.5 size-5 shrink-0 text-gold-deep" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Best time to visit</p>
                    <p className="text-sm text-ink-muted">{dest.bestTimeToVisit}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-ink md:text-3xl">Top attractions</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {dest.attractions.map((a) => (
                    <div key={a.title} className="rounded-lg border border-line bg-paper p-5">
                      <h3 className="flex items-center gap-2 font-heading text-lg text-ink">
                        <MapPin className="size-4 text-gold-deep" /> {a.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{a.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 font-heading text-2xl text-ink md:text-3xl">
                  <Lightbulb className="size-6 text-gold-deep" /> Travel tips
                </h2>
                <ul className="mt-5 space-y-3">
                  {dest.travelTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" /> {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-ink md:text-3xl">Gallery</h2>
                <div className="mt-5">
                  <Gallery images={dest.gallery} />
                </div>
              </div>
            </div>

            {/* Sidebar inquiry */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-line bg-paper p-6 shadow-[var(--shadow-soft)]">
                <h2 className="font-heading text-xl text-ink">Plan a {dest.name} trip</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Tell us your dates and we&apos;ll craft a tailored itinerary.
                </p>
                <div className="mt-5">
                  <InquiryForm
                    compact
                    source="destination"
                    referenceId={dest.id}
                    referenceTitle={`${dest.name} trip`}
                    defaultDestination={dest.name}
                  />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {relatedPackages.length > 0 && (
        <section className="bg-sand py-16 lg:py-20">
          <Container>
            <h2 className="font-heading text-3xl text-ink">Packages in {dest.name}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
