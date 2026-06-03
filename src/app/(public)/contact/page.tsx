import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Designer Drives India to plan your next journey. Call, email or WhatsApp us, or send a travel inquiry — we reply within 24 hours.",
  path: "/contact",
});

const details = [
  { icon: MapPin, label: "Visit us", value: siteConfig.contact.address },
  { icon: Phone, label: "Call us", value: siteConfig.contact.phone, href: siteConfig.contact.phoneHref },
  { icon: Mail, label: "Email us", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Clock, label: "Office hours", value: siteConfig.contact.hours },
];

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    "Hello Designer Drives India, I'd like to plan a trip.",
  )}`;

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Get in touch"
        title="Let's plan something memorable"
        intro="Tell us where you'd like to go and how you like to travel. A specialist will be in touch within 24 hours — no obligation."
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact" }]}
      />

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            {/* Details */}
            <div>
              <h2 className="font-heading text-2xl text-ink md:text-3xl">Reach us directly</h2>
              <ul className="mt-6 space-y-5">
                {details.map((d) => (
                  <li key={d.label} className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand text-gold-deep">
                      <d.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="text-ink transition-colors hover:text-gold-deep">{d.value}</a>
                      ) : (
                        <p className="text-ink-soft">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="size-4" /> Chat on WhatsApp
              </a>

              <div className="mt-8 overflow-hidden rounded-xl border border-line">
                <iframe
                  title="Designer Drives India office location"
                  src={siteConfig.contact.mapEmbed}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="rounded-xl border border-line bg-paper p-6 shadow-[var(--shadow-soft)] md:p-8">
              <h2 className="font-heading text-2xl text-ink">Send an inquiry</h2>
              <p className="mt-1 text-sm text-ink-muted">Fields marked with * are required.</p>
              <div className="mt-6">
                <InquiryForm source="contact" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
