import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CarCard } from "@/components/cards/car-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getFeaturedCars } from "@/server/repositories";

export async function CarShowcase() {
  const list = await getFeaturedCars();
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Travel in comfort"
            title="A fleet for every journey"
            intro="From plush SUVs for mountain roads to tempo travellers for the whole family — all chauffeur-driven, all impeccably maintained."
          />
          <ButtonLink href="/cars" variant="outline" size="md" className="hidden md:inline-flex">
            View Fleet
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.slice(0, 4).map((car, i) => (
            <Reveal key={car.id} delay={(i % 4) * 80}>
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
