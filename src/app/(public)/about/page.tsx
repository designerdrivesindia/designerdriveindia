import type { Metadata } from "next";
import Image from "next/image";
import { Compass, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Designer Drives India crafts bespoke, chauffeur-driven journeys across India and the Himalayas. Meet the team and the philosophy behind our trusted travel planning.",
  path: "/about",
});

const values = [
  { icon: HeartHandshake, title: "Trust above all", description: "Transparent pricing, honest advice and a team that picks up the phone — every time." },
  { icon: Compass, title: "Craft, not catalogue", description: "Every itinerary is built from scratch around how you actually like to travel." },
  { icon: Leaf, title: "Travel that gives back", description: "We work with local hosts, drivers and guides — keeping tourism rooted in community." },
  { icon: Sparkles, title: "Quietly luxurious", description: "Handpicked stays and thoughtful touches, without the noise or the markup." },
];

const services = [
  "Bespoke tour planning across India, Nepal, Bhutan & Sri Lanka",
  "Private, chauffeur-driven vehicles for every group size",
  "Handpicked hotels, houseboats and heritage stays",
  "Honeymoons, family holidays, group & corporate travel",
  "On-trip support, 24 hours a day",
  "Visa, permit and logistics handling",
];

const team = [
  { name: "Imran Qadri", role: "Founder & Kashmir Specialist", img: "photo-1507003211169-0a1dd7228f2d" },
  { name: "Meera Pillai", role: "South India Specialist", img: "photo-1494790108377-be9c29b29330" },
  { name: "Tenzin Norbu", role: "Himalaya & High-Altitude Guide", img: "photo-1500648767791-00dcc994a43e" },
  { name: "Aarav Sharma", role: "Guest Experience Lead", img: "photo-1519085360753-af0119f7cbe7" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="Our story"
        title="Travel, the way it should feel"
        intro="A small, dedicated team designing journeys across India and the Himalayas — with care, honesty and an obsessive eye for detail."
        image="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "About" }]}
      />

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow">Our mission</span>
              <h2 className="mt-3 font-heading text-3xl leading-tight text-ink md:text-4xl">
                Curated journeys, run by people who care
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
                <p>
                  Designer Drives India began in 2014 with a simple frustration: travel
                  to the places we love had become transactional. Cookie-cutter packages,
                  hidden charges, call-centre hand-offs.
                </p>
                <p>
                  So we built the opposite. A lead with one specialist from first enquiry
                  to safe return. Itineraries designed around you, not a template. Drivers
                  and hosts we know personally. And the kind of quiet, dependable service
                  that turns first-time guests into friends who keep coming back.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120} className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="https://media1.thrillophilia.com/filestore/about_us_media/hero-banner/main-card.png?w=300&dpr=2?auto=format&fit=crop&w=1200&q=80"
                alt="A serene Kashmir morning"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-sand py-16 lg:py-24">
        <Container>
          <SectionHeading align="center" eyebrow="What we believe" title="Our travel philosophy" />
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 80} className="text-center sm:text-left">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-paper text-gold-deep shadow-[var(--shadow-soft)]">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-xl text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <SectionHeading eyebrow="What we do" title="Everything, handled with care" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-lg border border-line bg-paper p-4 text-sm text-ink-soft">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-ink py-16 text-cream lg:py-24">
        <Container>
          <SectionHeading light align="center" eyebrow="The people" title="Meet the team" intro="Specialists who live and breathe these regions — and stay with you the whole way." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 80}>
                <div className="overflow-hidden rounded-xl bg-ink-soft/40">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={`https://images.unsplash.com/${m.img}?auto=format&fit=crop&w=700&q=80`}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-heading text-xl text-cream">{m.name}</p>
                    <p className="mt-1 text-sm text-gold-soft">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
