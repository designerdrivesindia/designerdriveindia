import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { DestinationExplorer } from "@/components/destinations/destination-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getDestinations } from "@/server/repositories";

export const metadata: Metadata = buildMetadata({
  title: "Destinations",
  description:
    "Explore our signature destinations across India, Nepal, Bhutan and Sri Lanka — Kashmir, Ladakh, Kerala, Rajasthan and more, with expert local knowledge.",
  path: "/destinations",
  keywords: ["India destinations", "Kashmir", "Ladakh", "Kerala", "Rajasthan", "Nepal", "Bhutan", "Sri Lanka"],
});

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ])}
      />
      <PageHero
        eyebrow="Where we travel"
        title="Destinations"
        intro="Seven regions across the subcontinent, each explored slowly and in comfort, with people who know them intimately."
        image="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Destinations" }]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <DestinationExplorer destinations={destinations} />
        </Container>
      </section>
    </>
  );
}
