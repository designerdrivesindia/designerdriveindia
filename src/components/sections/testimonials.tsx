"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTestimonials } from "@/data";

export function Testimonials() {
  const list = getTestimonials();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  return (
    <section className="bg-sand py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="In their words"
            title="Travellers who trusted us"
            intro="A few notes from the families, couples and explorers we've had the joy of planning for."
          />
          <div className="flex gap-2">
            <button
              onClick={() => embla?.scrollPrev()}
              aria-label="Previous testimonial"
              className="flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-paper"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => embla?.scrollNext()}
              aria-label="Next testimonial"
              className="flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-paper"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {list.map((t) => (
              <figure
                key={t.id}
                className="min-w-0 flex-[0_0_100%] rounded-lg border border-line bg-paper p-8 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <Quote className="size-8 text-gold/50" />
                <div className="mt-4 flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 font-heading text-lg leading-relaxed text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-sm text-ink-muted">{t.location} · {t.trip}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === selected ? "w-6 bg-gold" : "w-1.5 bg-line-strong"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
