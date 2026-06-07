/**
 * Centralized site configuration — brand details, contact info, nav, social.
 * Single source of truth used across layout, SEO, and footer.
 */

export const siteConfig = {
  name: "Designer Drives India",
  shortName: "Designer Drives",
  tagline: "Curated journeys across India & the Himalayas",
  description:
    "Designer Drives India crafts bespoke, chauffeur-driven tours across Kashmir, Ladakh, Kerala, Rajasthan, Nepal, Bhutan & Sri Lanka. Hand-picked stays, private vehicles and effortless, trusted travel planning.",
  url: "https://www.designerdrivesindia.com",
  locale: "en_IN",
  ogImage: "/og/default.jpg",

  contact: {
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    whatsapp: "919876543210",
    email: "journeys@designerdrivesindia.com",
    address: "2nd Floor, Heritage Arcade, MG Road, Gangtok, Sikkim 737101, India",
    mapEmbed:
      "https://www.google.com/maps?q=Gangtok%20Sikkim&output=embed",
    hours: "Mon – Sat · 9:30 AM – 7:00 PM IST",
  },

  social: {
    instagram: "https://instagram.com/designerdrivesindia",
    facebook: "https://facebook.com/designerdrivesindia",
    youtube: "https://youtube.com/@designerdrivesindia",
    linkedin: "https://linkedin.com/company/designerdrivesindia",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Tour Packages", href: "/packages" },
  { label: "Car Rentals", href: "/cars" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export const footerExplore: NavItem[] = [
  { label: "Tour Packages", href: "/packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "Car Rentals", href: "/cars" },
  { label: "Travel Blog", href: "/blog" },
  { label: "Plan My Trip", href: "/contact" },
];
