import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Instagram, Facebook, Youtube, Linkedin } from "@/components/icons/social";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "./newsletter-form";
import { WhatsAppFab } from "./whatsapp-fab";
import {
  siteConfig,
  footerExplore,
  legalNav,
} from "@/lib/site";
import { destinations } from "@/data";

const socials = [
  { href: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
  { href: siteConfig.social.facebook, icon: Facebook, label: "Facebook" },
  { href: siteConfig.social.youtube, icon: Youtube, label: "YouTube" },
  { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <>
      <footer className="bg-ink text-cream/80">
        <Container className="py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
            {/* Brand + newsletter */}
            <div>
              <p className="font-heading text-2xl font-semibold text-cream">
                Designer Drives India
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">
                Bespoke, chauffeur-driven journeys across India and the
                Himalayas — crafted with care, run with trust.
              </p>
              <p className="mt-6 text-sm font-medium text-cream">
                Travel stories & seasonal offers
              </p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>

            {/* Explore */}
            <nav aria-label="Explore">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Explore</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {footerExplore.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-cream/70 transition-colors hover:text-gold-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Destinations */}
            <nav aria-label="Destinations">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Destinations</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {destinations.slice(0, 6).map((d) => (
                  <li key={d.id}>
                    <Link href={`/destinations/${d.slug}`} className="text-cream/70 transition-colors hover:text-gold-soft">
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Get in touch</h3>
              <ul className="mt-4 space-y-3 text-sm text-cream/70">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold-soft" />
                  <span>{siteConfig.contact.address}</span>
                </li>
                <li>
                  <a href={siteConfig.contact.phoneHref} className="flex gap-3 transition-colors hover:text-gold-soft">
                    <Phone className="size-4 shrink-0 text-gold-soft" />
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="flex gap-3 transition-colors hover:text-gold-soft">
                    <Mail className="size-4 shrink-0 text-gold-soft" />
                    {siteConfig.contact.email}
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold-soft"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-6 text-sm text-cream/55 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-gold-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </footer>
      <WhatsAppFab />
    </>
  );
}
