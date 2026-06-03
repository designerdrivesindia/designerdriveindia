import type { BlogPost } from "@/types";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const blogPosts: BlogPost[] = [
  {
    id: "blog-best-time-kashmir",
    slug: "best-time-to-visit-kashmir",
    title: "The Best Time to Visit Kashmir: A Season-by-Season Guide",
    excerpt:
      "From tulip blooms in April to first snow in December — how to choose the perfect month for your valley escape.",
    coverImage: u("photo-1566837497312-7be4a47b1bbe"),
    category: "Destination Guides",
    tags: ["Kashmir", "Seasons", "Planning"],
    author: { name: "Imran Qadri", role: "Kashmir Travel Specialist" },
    publishedAt: "2025-03-12",
    readMinutes: 6,
    featured: true,
    content: [
      { heading: "Spring (March–May)", body: "Spring is Kashmir at its most photogenic. The Indira Gandhi Tulip Garden bursts open in early April, orchards bloom across the valley, and temperatures sit comfortably between 12–22°C. It's our most-requested window for honeymooners." },
      { heading: "Summer (June–August)", body: "When the plains swelter, Kashmir stays cool and green. Gulmarg's meadows are lush, Pahalgam's rivers run full, and the high-altitude valleys are at their best for gentle walks." },
      { heading: "Autumn (September–November)", body: "The famed chinar trees turn crimson and gold. Crowds thin, light turns golden, and it's a quietly romantic time to drift across Dal Lake." },
      { heading: "Winter (December–February)", body: "Gulmarg becomes a serious ski destination and the valley turns to snow. Pack well — but the houseboats with heating are magical in the quiet of winter." },
    ],
  },
  {
    id: "blog-ladakh-altitude",
    slug: "how-to-prepare-for-ladakh-altitude",
    title: "How to Prepare for Ladakh's Altitude (Without Cutting Your Trip Short)",
    excerpt:
      "Acclimatisation, hydration and pacing — a practical guide to enjoying the high Himalaya safely.",
    coverImage: u("photo-1589556264800-08ae9e129a8c"),
    category: "Travel Tips",
    tags: ["Ladakh", "Health", "Adventure"],
    author: { name: "Tenzin Norbu", role: "High-Altitude Guide" },
    publishedAt: "2025-02-20",
    readMinutes: 7,
    featured: true,
    content: [
      { heading: "Give yourself two nights in Leh", body: "Altitude sickness is the single biggest reason trips get cut short. We build in two nights in Leh (3,500m) before any high passes — non-negotiable for a good trip." },
      { heading: "Hydrate more than you think", body: "The high desert is dry. Aim for 3–4 litres of water a day and go easy on alcohol and caffeine in the first 48 hours." },
      { heading: "Pace the passes", body: "Khardung La and Chang La sit above 5,000m. We don't linger at the top, and we descend to sleep at lower elevations wherever possible." },
      { heading: "Listen to your body", body: "Mild headaches are normal; persistent symptoms are not. Our vehicles carry oxygen and our drivers know exactly when to turn around." },
    ],
  },
  {
    id: "blog-kerala-houseboat",
    slug: "what-to-expect-kerala-houseboat",
    title: "What to Expect on a Private Kerala Houseboat",
    excerpt:
      "A night drifting through the Alleppey backwaters — the food, the pace and the little details that make it special.",
    coverImage: u("photo-1602216056096-3b40cc0c9944"),
    category: "Destination Guides",
    tags: ["Kerala", "Backwaters", "Honeymoon"],
    author: { name: "Meera Pillai", role: "South India Specialist" },
    publishedAt: "2025-01-30",
    readMinutes: 5,
    featured: false,
    content: [
      { heading: "Your own floating home", body: "A private houseboat means the whole vessel is yours — a crew of two or three, a chef, and a sundeck to watch the canals slide by. No fixed schedule, no strangers." },
      { heading: "The food is the star", body: "Freshly caught karimeen, coconut curries and just-picked vegetables, cooked onboard and served when you're hungry. Tell us your preferences and we'll brief the chef." },
      { heading: "A gentle rhythm", body: "Boats cruise through the morning and afternoon, then moor by the bank for the night. Evenings are still, lit by lanterns, with birdsong and the occasional passing canoe." },
    ],
  },
  {
    id: "blog-pack-himalayas",
    slug: "what-to-pack-for-the-himalayas",
    title: "What to Pack for a Himalayan Road Trip",
    excerpt:
      "Layering, footwear and the small things travellers always forget — a tried-and-tested packing list.",
    coverImage: u("photo-1544735716-392fe2489ffa"),
    category: "Travel Tips",
    tags: ["Packing", "Himalaya", "Adventure"],
    author: { name: "Imran Qadri", role: "Kashmir Travel Specialist" },
    publishedAt: "2025-03-02",
    readMinutes: 4,
    featured: false,
    content: [
      { heading: "Layer, don't bulk", body: "Mountain weather swings fast. A base layer, a fleece and a windproof shell beat one heavy coat every time, and pack down far smaller." },
      { heading: "Footwear matters", body: "Broken-in walking shoes with grip. For the Tiger's Nest or Aru Valley, your knees will thank you for proper soles." },
      { heading: "The easily forgotten", body: "High-SPF sunscreen and lip balm (the high-altitude sun is fierce), a reusable water bottle, basic medication, and copies of your permits and ID." },
    ],
  },
];
