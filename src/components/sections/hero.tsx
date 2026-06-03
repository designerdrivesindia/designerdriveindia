import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlanTripButton } from "@/components/inquiry/plan-trip-button";
import { QuickInquiryStrip } from "./quick-inquiry-strip";

export function Hero() {
  return (
    <section className="relative">
      <div className="relative flex min-h-[88vh] items-center overflow-hidden">
        {/* Background video — aerial view of a Kashmir lake, looping */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/kashmir-hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/kashmir-hero.webm" type="video/webm" />
          <source src="/videos/kashmir-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/40 to-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-transparent" />

        <Container className="relative z-10 pt-28 pb-40 md:pb-48">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
                Bespoke journeys since 2014
              </span>
            </div>
            <h1 className="font-heading text-4xl font-medium leading-[1.08] text-cream sm:text-5xl md:text-6xl lg:text-7xl">
              Curated journeys across India &amp; the Himalayas
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
              From the lakes of Kashmir to the backwaters of Kerala — private,
              chauffeur-driven travel, thoughtfully designed around the way you
              like to explore.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/packages" variant="gold" size="lg">
                Explore Packages
              </ButtonLink>
              <PlanTripButton variant="outline-light" size="lg">
                Plan My Trip
              </PlanTripButton>
              <ButtonLink href="/contact" variant="outline-light" size="lg">
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      {/* Quick inquiry strip overlapping the hero */}
      <Container className="relative z-20 -mt-24 md:-mt-28">
        <QuickInquiryStrip />
      </Container>
    </section>
  );
}
