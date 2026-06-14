import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PlanTripButton } from "@/components/inquiry/plan-trip-button";
import { ButtonLink } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl px-6 py-16 text-center md:px-16 md:py-24">
          <Image
            src="https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/70" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-medium leading-tight text-cream md:text-5xl">
              Ready to explore Incredible India?
            </h2>
            <p className="mt-4 text-base text-cream/80 md:text-lg">
              Request your free tour consultation today. Contact us via WhatsApp,
              phone or email and we&apos;ll craft a customised itinerary tailored to
              your interests and budget — with no obligation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PlanTripButton variant="gold" size="lg">Book Your Tour Now</PlanTripButton>
              <ButtonLink href="/packages" variant="outline-light" size="lg">
                Browse Packages
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
