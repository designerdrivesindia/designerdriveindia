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
  "Customized tour packages",
  "Golden Triangle tours",
  "Rajasthan heritage tours",
  "Kerala & South India tours",
  "Private car & driver services",
  "Airport transfers",
  "Hotel reservations",
  "Licensed tour guides",
  "Domestic flight assistance",
  "Group tour management",
];

// const team = [
//   { name: "Imran Qadri", role: "Founder & Kashmir Specialist", img: "photo-1507003211169-0a1dd7228f2d" },
//   { name: "Meera Pillai", role: "South India Specialist", img: "photo-1494790108377-be9c29b29330" },
//   { name: "Tenzin Norbu", role: "Himalaya & High-Altitude Guide", img: "photo-1500648767791-00dcc994a43e" },
//   { name: "Aarav Sharma", role: "Guest Experience Lead", img: "photo-1519085360753-af0119f7cbe7" },
// ];

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
              <span className="eyebrow">Welcome</span>
              <h2 className="mt-3 font-heading text-3xl leading-tight text-ink md:text-4xl">
                Welcome to Designer Drives India
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
                <p>
                  Namaste — and welcome to Designer Drives India, your trusted travel
                  partner for discovering the beauty, culture, history and diversity of
                  India. Based in Jaipur, Rajasthan, we specialise in the iconic Golden
                  Triangle of Delhi, Agra and Jaipur, the royal palaces of Rajasthan and
                  the tranquil backwaters of Kerala.
                </p>
                <p>
                  Whether you are visiting for the first time or returning to explore
                  more of this incredible country, we design personalised travel
                  experiences that let you see India at your own pace. Our mission is
                  simple: exceptional service, authentic experiences and complete peace
                  of mind — from the moment you arrive until your departure.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120} className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
                alt="Hawa Mahal in Jaipur, Rajasthan"
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

      {/* Founder */}
      <section className="bg-ink py-16 text-cream lg:py-24">
        <Container>
          <SectionHeading
            light
            align="center"
            eyebrow="The people"
            title="Meet the founder — Deepak Meena"
            intro="Founder & Managing Director, and a Government of Rajasthan approved tour guide certified by the Ministry of Tourism."
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal className="rounded-xl border border-cream/15 bg-ink-soft/40 p-8 text-center">
              <span className="mx-auto flex size-24 items-center justify-center rounded-full bg-gold/15 font-heading text-4xl text-gold-soft">
                DM
              </span>
              <p className="mt-5 font-heading text-2xl text-cream">Deepak Meena</p>
              <p className="mt-1 text-sm text-gold-soft">Founder & Managing Director</p>
              <ul className="mt-6 space-y-2.5 text-left text-sm text-cream/70">
                {[
                  "Government-approved, Ministry of Tourism–certified guide",
                  "Nearly a decade in the tourism industry",
                  "Active group tour handler & tour escort",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" /> {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="space-y-4 text-base leading-relaxed text-cream/75">
              <p>
                With nearly ten years of experience in the tourism industry, Deepak has
                worked extensively with travellers from around the world, helping them
                experience the rich culture, history and traditions of India. Before
                establishing Designer Drives India, he spent more than eight years
                helping run one of Jaipur&apos;s leading tour operations.
              </p>
              <p>
                Born and raised in a tribal village near Jaipur, Deepak developed a deep
                appreciation for India&apos;s cultural heritage early on. He later pursued
                his higher education in Delhi under the mentorship of Professor Jagdish
                Chander of Hindu College, University of Delhi.
              </p>
              <p>
                Known for his warm personality, local knowledge and dedication to guest
                satisfaction, Deepak built Designer Drives India entirely through
                word-of-mouth recommendations. Today he remains personally involved in
                day-to-day operations, ensuring every guest enjoys an authentic,
                professional and personalised journey.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
