/**
 * Centralized site configuration — brand details, contact info, nav, social.
 * Single source of truth used across layout, SEO, and footer.
 */

export const siteConfig = {
  name: "Designer Drives India",
  shortName: "Designer Drives",
  tagline: "Creating memorable journeys across Incredible India",
  description:
    "Designer Drives India is a Jaipur-based travel company crafting bespoke, chauffeur-driven tours across the Golden Triangle, Rajasthan, Kerala and beyond. Handpicked stays, private vehicles, licensed guides and effortless, trusted travel planning.",
  url: "https://www.designerdrivesindia.com",
  locale: "en_IN",
  ogImage: "/og/default.jpg",

  contact: {
    phone: "+91 98294 27706",
    phoneHref: "tel:+919829427706",
    whatsapp: "919829427706",
    email: "info@designerdrivesindia.com",
    address:
      "A-71, Maa Karni Nagar, Karni Palace Road, Vaishali Nagar, Jaipur, Rajasthan – 302021, India",
    mapEmbed:
      "https://www.google.com/maps?q=Vaishali%20Nagar%20Jaipur%20Rajasthan&output=embed",
    hours: "Mon – Sun · 8:00 AM – 8:00 PM IST",
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
  { label: "Refund & Payment Policy", href: "/refund-policy" },
];

export const footerExplore: NavItem[] = [
  { label: "Tour Packages", href: "/packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "Car Rentals", href: "/cars" },
  { label: "Travel Blog", href: "/blog" },
  { label: "Plan My Trip", href: "/contact" },
];
