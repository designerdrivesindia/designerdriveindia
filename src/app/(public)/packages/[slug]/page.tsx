import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Check, X, Clock, MapPin, Hotel, Car as CarIcon, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { Gallery } from "@/components/ui/gallery";
import { StarRating } from "@/components/ui/star-rating";
import { PackageCard } from "@/components/cards/package-card";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, packageSchema, breadcrumbSchema } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import { getPackages, getPackageBySlug, getRelatedPackages } from "@/server/repositories";

export async function generateStaticParams() {
  const list = await getPackages();
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return { title: "Package not found" };
  return buildMetadata({
    title: `${pkg.title} — ${pkg.durationNights}N/${pkg.durationDays}D`,
    description: pkg.summary,
    path: `/packages/${pkg.slug}`,
    image: pkg.heroImage,
    type: "article",
    keywords: [pkg.title, pkg.state, pkg.country, ...pkg.tripTypes],
  });
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const related = await getRelatedPackages(pkg);

  return (
    <>
      <JsonLd
        data={[
          packageSchema(pkg),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Packages", path: "/packages" },
            { name: pkg.title, path: `/packages/${pkg.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative text-cream">
        <Image src={pkg.heroImage} alt={pkg.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/55" />
        <Container className="relative z-10 flex min-h-[70vh] flex-col justify-end pb-12 pt-36">
          <Breadcrumbs
            light
            items={[
              { name: "Home", path: "/" },
              { name: "Packages", path: "/packages" },
              { name: pkg.title },
            ]}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            {pkg.tripTypes.map((t) => <Badge key={t} variant="light" size="sm">{t}</Badge>)}
          </div>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
            {pkg.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/85">
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> {pkg.state}, {pkg.country}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="size-4" /> {pkg.durationNights} Nights / {pkg.durationDays} Days</span>
            <span className="inline-flex items-center gap-1.5"><Star className="size-4 fill-gold text-gold" /> {pkg.rating} ({pkg.reviewCount} reviews)</span>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Main content */}
            <div className="min-w-0">
              {/* Overview */}
              <Block title="Overview">
                <p className="text-base leading-relaxed text-ink-soft">{pkg.overview}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" /> {h}
                    </li>
                  ))}
                </ul>
              </Block>

              {/* Itinerary timeline */}
              <Block title="Day-by-day itinerary">
                <ol className="relative space-y-7 border-l border-line pl-7">
                  {pkg.itinerary.map((day) => (
                    <li key={day.day} className="relative">
                      <span className="absolute -left-[2.1rem] flex size-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-cream">
                        {day.day}
                      </span>
                      <h3 className="font-heading text-xl text-ink">{day.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{day.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        {day.stay && <Badge variant="sand" size="sm"><Hotel className="size-3" /> {day.stay}</Badge>}
                        {day.meals?.map((m) => <Badge key={m} variant="outline" size="sm">{m}</Badge>)}
                      </div>
                    </li>
                  ))}
                </ol>
              </Block>

              {/* Inclusions / exclusions */}
              <Block title="What's included">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-success">Inclusions</h3>
                    <ul className="space-y-2.5">
                      {pkg.inclusions.map((x) => (
                        <li key={x} className="flex items-start gap-2.5 text-sm text-ink-soft">
                          <Check className="mt-0.5 size-4 shrink-0 text-success" /> {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-danger">Exclusions</h3>
                    <ul className="space-y-2.5">
                      {pkg.exclusions.map((x) => (
                        <li key={x} className="flex items-start gap-2.5 text-sm text-ink-muted">
                          <X className="mt-0.5 size-4 shrink-0 text-danger/70" /> {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Block>

              {/* Hotels & transport */}
              <Block title="Stays & transport">
                <div className="overflow-hidden rounded-lg border border-line">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-sand text-xs uppercase tracking-wide text-ink-muted">
                      <tr>
                        <th className="px-4 py-3 font-semibold">City</th>
                        <th className="px-4 py-3 font-semibold">Hotel</th>
                        <th className="px-4 py-3 font-semibold">Category</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {pkg.hotels.map((h) => (
                        <tr key={h.city}>
                          <td className="px-4 py-3 font-medium text-ink">{h.city}</td>
                          <td className="px-4 py-3 text-ink-soft">{h.name}</td>
                          <td className="px-4 py-3 text-ink-muted">{h.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 flex items-start gap-2.5 text-sm text-ink-soft">
                  <CarIcon className="mt-0.5 size-4 shrink-0 text-gold-deep" /> {pkg.transport}
                </p>
              </Block>

              {/* Gallery */}
              <Block title="Gallery">
                <Gallery images={pkg.gallery} />
              </Block>

              {/* FAQs */}
              <Block title="Frequently asked questions">
                <Accordion items={pkg.faqs} />
              </Block>
            </div>

            {/* Sticky sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-line bg-paper p-6 shadow-[var(--shadow-soft)]">
                <div className="flex items-end justify-between border-b border-line pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink-muted">Starting from</p>
                    <p className="font-heading text-3xl font-semibold text-ink">{formatINR(pkg.startingPrice)}</p>
                    <p className="text-xs text-ink-muted">per person · customisable</p>
                  </div>
                  <StarRating rating={pkg.rating} />
                </div>
                <h2 className="mt-5 font-heading text-xl text-ink">Enquire about this trip</h2>
                <p className="mt-1 text-sm text-ink-muted">No obligation — a specialist replies within 24 hours.</p>
                <div className="mt-5">
                  <InquiryForm
                    compact
                    source="package"
                    referenceId={pkg.id}
                    referenceTitle={pkg.title}
                    defaultDestination={pkg.country}
                  />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-sand py-16 lg:py-20">
          <Container>
            <h2 className="font-heading text-3xl text-ink">You may also like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 border-b border-line pb-12 last:mb-0 last:border-0 last:pb-0">
      <h2 className="mb-5 font-heading text-2xl text-ink md:text-3xl">{title}</h2>
      {children}
    </div>
  );
}
