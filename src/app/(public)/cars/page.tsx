import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { CarExplorer } from "@/components/cars/car-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getCars } from "@/server/repositories";

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
        eyebrow="Travel in comfort"
        title="Car Rentals"
        intro="Every vehicle is chauffeur-driven, impeccably maintained and chosen for the road ahead — from mountain passes to city transfers."
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Car Rentals" }]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <CarExplorer cars={cars} />
        </Container>
      </section>
    </>
  );
}
