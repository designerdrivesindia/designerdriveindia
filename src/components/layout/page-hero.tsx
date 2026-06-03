import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

/** Compact inner-page hero with optional background image and breadcrumbs. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  breadcrumbs?: { name: string; path?: string }[];
}) {
  const hasImage = !!image;
  return (
    <section
      className={`relative overflow-hidden ${hasImage ? "text-cream" : "bg-sand text-ink"}`}
    >
      {hasImage && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/70" />
        </>
      )}
      <Container className={`relative z-10 ${hasImage ? "pt-36 pb-16 md:pt-44 md:pb-20" : "pt-32 pb-14 md:pt-36 md:pb-16"}`}>
        {breadcrumbs && (
          <div className="mb-5">
            <Breadcrumbs items={breadcrumbs} light={hasImage} />
          </div>
        )}
        {eyebrow && (
          <div className="mb-3 flex items-center gap-3">
            <span className={`h-px w-8 ${hasImage ? "bg-gold-soft" : "bg-gold"}`} />
            <span className={`text-xs font-semibold uppercase tracking-[0.22em] ${hasImage ? "text-gold-soft" : "text-gold-deep"}`}>
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className={`max-w-3xl font-heading text-4xl leading-tight md:text-5xl lg:text-6xl ${hasImage ? "text-cream" : "text-ink"}`}>
          {title}
        </h1>
        {intro && (
          <p className={`mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${hasImage ? "text-cream/80" : "text-ink-muted"}`}>
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
