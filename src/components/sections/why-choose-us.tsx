import { ShieldCheck, Map, Globe2, Headset, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { WHY_CHOOSE_US } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Map,
  Globe2,
  Headset,
};

export function WhyChooseUs() {
  return (
    <section className="bg-ink py-20 text-cream lg:py-28">
      <Container>
        <SectionHeading
          light
          align="center"
          eyebrow="Why Designer Drives"
          title="Travel that feels personal, run by people you can trust"
          intro="No call-centre hand-offs, no surprise charges. Just thoughtful planning and a team that stays with you, start to finish."
        />
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;
            return (
              <Reveal key={item.title} delay={(i % 4) * 90} className="text-center sm:text-left">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold/40 text-gold-soft">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-heading text-xl text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
