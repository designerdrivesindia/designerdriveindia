import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { DestinationCard } from "@/components/cards/destination-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getDestinations } from "@/server/repositories";

export async function FeaturedDestinations() {
  const list = await getDestinations();
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Where we travel"
            title="Destinations worth the journey"
            intro="Seven signature regions across the subcontinent — each one explored slowly, in comfort, and with people who know it intimately."
          />
          <ButtonLink href="/destinations" variant="outline" size="md" className="hidden md:inline-flex">
            All Destinations
          </ButtonLink>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {list.slice(0, 5).map((d, i) => (
            <Reveal
              key={d.id}
              delay={(i % 4) * 80}
              className={
                i === 0
                  ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                  : "aspect-[3/4]"
              }
            >
              <DestinationCard destination={d} className="h-full w-full" />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink href="/destinations" variant="outline" size="md" className="w-full">
            All Destinations
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
