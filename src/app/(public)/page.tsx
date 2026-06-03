import { Hero } from "@/components/sections/hero";
import { FeaturedDestinations } from "@/components/sections/featured-destinations";
import { PopularPackages } from "@/components/sections/popular-packages";
import { CarShowcase } from "@/components/sections/car-showcase";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { GallerySection } from "@/components/sections/gallery-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <FeaturedDestinations />
      <PopularPackages />
      <WhyChooseUs />
      <CarShowcase />
      <Testimonials />
      <BlogPreview />
      <GallerySection />
      <CtaBanner />
    </>
  );
}
