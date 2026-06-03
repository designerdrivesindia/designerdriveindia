import Image from "next/image";
import { Instagram } from "@/components/icons/social";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

const shots = [
  "photo-1605649487212-47bdab064df7",
  "photo-1589556264800-08ae9e129a8c",
  "photo-1602216056096-3b40cc0c9944",
  "photo-1599661046289-e31897846e41",
  "photo-1544735716-392fe2489ffa",
  "photo-1553856622-d1b352e9a211",
];

export function GallerySection() {
  return (
    <section className="bg-ink py-20 text-cream lg:py-28">
      <Container>
        <SectionHeading
          light
          align="center"
          eyebrow="@designerdrivesindia"
          title="Moments from the road"
          intro="Tag us on your travels — we love reliving the journeys with you."
        />
        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 md:gap-3">
          {shots.map((id, i) => (
            <a
              key={id}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-md"
              aria-label="View on Instagram"
            >
              <Image
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=70`}
                alt="Travel moment"
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading={i > 2 ? "lazy" : undefined}
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/55 opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram className="size-6 text-cream" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
