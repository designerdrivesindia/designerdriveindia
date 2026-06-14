import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CarExplorer } from "@/components/cars/car-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getCars } from "@/server/repositories";

const includedWithEveryVehicle = [
  "Professional chauffeur",
  "Air-conditioned vehicle",
  "Clean & sanitised fleet",
  "Airport pick-up & drop-off",
  "Multi-day tour services",
  "24/7 travel assistance",
  "Safe & reliable transport across India",
];

export const metadata: Metadata = buildMetadata({
  title: "Car Rentals with Chauffeur",
  description:
    "Chauffeur-driven SUVs, sedans, tempo travellers and luxury cars across India. Comfortable, well-maintained vehicles with experienced drivers from Designer Drives India.",
  path: "/cars",
  keywords: ["car rental India", "chauffeur driven car", "Innova hire", "tempo traveller rental", "luxury car India"],
});

export default async function CarsPage() {
  const cars = await getCars();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Car Rentals", path: "/cars" },
        ])}
      />
      <PageHero
        eyebrow="Travel comfortably across India"
        title="Our Fleet"
        intro="A wide range of well-maintained, air-conditioned vehicles for solo travellers, couples, families and large groups — every one driven by an experienced, professional chauffeur for a safe and comfortable journey."
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Car Rentals" }]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <CarExplorer cars={cars} />
        </Container>
      </section>

      <section className="bg-sand py-16 lg:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Always included"
            title="Included with every vehicle"
            intro="Whichever vehicle you choose, every booking comes with the same standard of service and care."
          />
          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {includedWithEveryVehicle.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg border border-line bg-paper p-4 text-sm text-ink-soft"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                  <Check className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
