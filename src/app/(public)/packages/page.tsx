import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { PackageExplorer } from "@/components/packages/package-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getPackages } from "@/server/repositories";

export const metadata: Metadata = buildMetadata({
  title: "Tour Packages",
  description:
    "Browse curated, fully-customisable tour packages across Kashmir, Ladakh, Kerala, Rajasthan, Nepal, Bhutan and Sri Lanka. Private, chauffeur-driven journeys by Designer Drives India.",
  path: "/packages",
  keywords: ["India tour packages", "Kashmir packages", "Ladakh tours", "Kerala holidays", "luxury travel India"],
});

export default async function PackagesPage() {
  const packages = await getPackages();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tour Packages", path: "/packages" },
        ])}
      />
      <PageHero
        eyebrow="Handpicked itineraries"
        title="Tour Packages"
        intro="Loved by travellers, refined over years — and every one of them tailorable to your dates, pace and budget."
        image="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Packages" }]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <PackageExplorer packages={packages} />
        </Container>
      </section>
    </>
  );
}
