"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { useUIStore } from "@/store/ui-store";
import { PlanTripButton } from "@/components/inquiry/plan-trip-button";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const mobileOpen = useUIStore((s) => s.mobileNavOpen);
  const setMobile = useUIStore((s) => s.setMobileNav);

  // Home page has a dark hero we sit over; other pages always get the solid bar.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
  }, [pathname, setMobile]);

  const solid = scrolled || !overHero || mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-line/70 bg-cream/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-4">
        <Logo dark={!solid} />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  solid ? "text-ink-soft hover:text-ink" : "text-cream/90 hover:text-cream",
                  active && (solid ? "text-ink" : "text-cream"),
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.contact.phoneHref}
            className={cn(
              "hidden items-center gap-2 text-sm font-medium xl:flex",
              solid ? "text-ink-soft hover:text-ink" : "text-cream/90 hover:text-cream",
            )}
          >
            <Phone className="size-4" />
            {siteConfig.contact.phone}
          </a>
          <PlanTripButton
            variant={solid ? "gold" : "outline-light"}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Plan My Trip
          </PlanTripButton>
          <button
            className={cn(
              "flex size-10 items-center justify-center rounded-full lg:hidden",
              solid ? "text-ink" : "text-cream",
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobile(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden">
          <Container className="flex flex-col gap-1 border-t border-line/70 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-base font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-line/70 pt-4">
              <PlanTripButton variant="gold" size="md">Plan My Trip</PlanTripButton>
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center justify-center gap-2 text-sm font-medium text-ink-soft"
              >
                <Phone className="size-4" /> {siteConfig.contact.phone}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
