import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PackageCard } from "@/components/cards/package-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getFeaturedPackages } from "@/server/repositories";

export async function PopularPackages() {
  const list = await getFeaturedPackages();
  return (
    <section className="bg-sand py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Handpicked itineraries"
          title="Popular tour packages"
          intro="Tried, tested and loved — our most-requested journeys, each one fully customisable to your dates and pace."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((pkg, i) => (
            <Reveal key={pkg.id} delay={(i % 3) * 90}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/packages" variant="primary" size="lg">
            View All Packages
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
