import type { Destination } from "@/types";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const destinations: Destination[] = [
  {
    id: "dest-kashmir",
    slug: "kashmir",
    name: "Kashmir",
    country: "India",
    region: "North India · Himalayas",
    tagline: "Shikara mornings, meadows of gold",
    heroImage: u("photo-1598091383021-15ddea10925d"),
    thumbnail: u("photo-1598091383021-15ddea10925d", 900),
    overview:
      "Often called paradise on earth, Kashmir is a valley of mirror-still lakes, saffron fields and snow-dusted pine. Glide across Dal Lake on a hand-carved shikara, wake to mist over the Pir Panjal, and trade the city's pace for the slow grace of houseboats and mountain meadows.",
    bestTimeToVisit:
      "March–October. Tulips bloom in April; Pahalgam and Gulmarg are lush through summer; snow arrives by December.",
    seasons: ["Spring", "Summer", "Autumn"],
    tripTypes: ["Honeymoon", "Family", "Luxury"],
    attractions: [
      { title: "Dal Lake & Shikara Rides", description: "Floating gardens, houseboats and the famous floating market at dawn." },
      { title: "Gulmarg Gondola", description: "One of the world's highest cable cars, climbing to Apharwat Peak." },
      { title: "Pahalgam Valleys", description: "Betaab and Aru valleys — riverside meadows ringed by deodar forest." },
      { title: "Mughal Gardens", description: "Terraced Shalimar and Nishat Bagh framing the lake." },
    ],
    travelTips: [
      "Carry layers even in summer — evenings by the lake stay cool.",
      "Book houseboats and Gulmarg gondola slots in advance during peak bloom.",
      "Cash is handy in remote valleys where card networks are patchy.",
    ],
    gallery: [
      { src: u("photo-1598091383021-15ddea10925d"), alt: "Dal Lake shikaras at dawn" },
      { src: u("photo-1605649487212-47bdab064df7"), alt: "Snow meadows of Gulmarg" },
      { src: u("photo-1598091383021-15ddea10925d"), alt: "Houseboat on a Kashmir lake" },
    ],
    featured: true,
  },
  {
    id: "dest-ladakh",
    slug: "ladakh",
    name: "Ladakh",
    country: "India",
    region: "North India · High Himalaya",
    tagline: "High passes, prayer flags, infinite skies",
    heroImage: u("photo-1589556264800-08ae9e129a8c"),
    thumbnail: u("photo-1589556264800-08ae9e129a8c", 900),
    overview:
      "A moonscape of ochre ridges and turquoise lakes at the roof of India. Ladakh rewards the slow traveller — whitewashed gompas clinging to cliffs, the surreal blue of Pangong, and the thin, clear light of the high desert.",
    bestTimeToVisit:
      "May–September, when the high passes of Khardung La and Chang La are open and roads from Manali and Srinagar are clear.",
    seasons: ["Summer", "Autumn"],
    tripTypes: ["Adventure", "Group", "Luxury"],
    attractions: [
      { title: "Pangong Tso", description: "A 134-km lake that shifts through every shade of blue with the sun." },
      { title: "Nubra Valley", description: "Sand dunes, double-humped camels and the road over Khardung La." },
      { title: "Thiksey & Hemis Monasteries", description: "Living Buddhist monasteries with dawn prayer ceremonies." },
      { title: "Magnetic Hill & Confluence", description: "The meeting of the Indus and Zanskar rivers." },
    ],
    travelTips: [
      "Acclimatise in Leh for two nights before driving to high altitude.",
      "Inner Line Permits are required for Nubra, Pangong and Tso Moriri.",
      "Fuel up in Leh — petrol pumps are scarce beyond the valley.",
    ],
    gallery: [
      { src: u("photo-1589556264800-08ae9e129a8c"), alt: "Pangong Lake under blue sky" },
      { src: u("photo-1605640840605-14ac1855827b"), alt: "Ladakh monastery on a ridge" },
      { src: u("photo-1581791534721-e599df4417f7"), alt: "Mountain road in Ladakh" },
    ],
    featured: true,
  },
  {
    id: "dest-kerala",
    slug: "kerala",
    name: "Kerala",
    country: "India",
    region: "South India · Backwaters",
    tagline: "Backwater calm, spice-scented hills",
    heroImage: u("photo-1602216056096-3b40cc0c9944"),
    thumbnail: u("photo-1602216056096-3b40cc0c9944", 900),
    overview:
      "God's own country unfurls in palm-lined canals, tea-terraced hills and Arabian Sea beaches. Drift through Alleppey's backwaters on a private houseboat, breathe the cool of Munnar's plantations, and end with Ayurveda by the shore.",
    bestTimeToVisit:
      "September–March for dry, pleasant weather across backwaters, hills and coast.",
    seasons: ["Autumn", "Winter"],
    tripTypes: ["Honeymoon", "Family", "Luxury"],
    attractions: [
      { title: "Alleppey Backwaters", description: "Private houseboat cruises through a maze of palm-fringed canals." },
      { title: "Munnar Tea Hills", description: "Rolling emerald plantations and misty mountain viewpoints." },
      { title: "Fort Kochi", description: "Chinese fishing nets, colonial lanes and a vibrant art scene." },
      { title: "Periyar Wildlife", description: "Boat safaris on a lake set within a tiger reserve." },
    ],
    travelTips: [
      "Book houseboats with private check-in for the quietest stretches.",
      "Carry light cottons and rain protection even outside monsoon.",
      "Pre-book Ayurveda centres — reputable ones fill up fast.",
    ],
    gallery: [
      { src: u("photo-1602216056096-3b40cc0c9944"), alt: "Kerala backwater houseboat" },
      { src: u("photo-1593693411515-c20261bcad6e"), alt: "Munnar tea plantations" },
      { src: u("photo-1623691874623-69e9f95a4f56"), alt: "Fort Kochi fishing nets" },
    ],
    featured: true,
  },
  {
    id: "dest-rajasthan",
    slug: "rajasthan",
    name: "Rajasthan",
    country: "India",
    region: "West India · Desert & Palaces",
    tagline: "Fort cities, royal stays, desert dusk",
    heroImage: u("photo-1599661046289-e31897846e41"),
    thumbnail: u("photo-1599661046289-e31897846e41", 900),
    overview:
      "The land of kings is a riot of colour — pink Jaipur, blue Jodhpur, golden Jaisalmer. Sleep in restored palaces, watch the sun fall over the Thar from a camel's back, and trace the romance of Udaipur's lakes.",
    bestTimeToVisit:
      "October–March, when desert days are warm and nights are cool and comfortable.",
    seasons: ["Autumn", "Winter"],
    tripTypes: ["Luxury", "Family", "Honeymoon"],
    attractions: [
      { title: "Amber Fort, Jaipur", description: "Hilltop fort of mirrored halls and sweeping ramparts." },
      { title: "Lake Palace, Udaipur", description: "The white marble palace afloat on Lake Pichola." },
      { title: "Mehrangarh, Jodhpur", description: "A towering fort above the blue city's tangled lanes." },
      { title: "Jaisalmer Dunes", description: "Camel safaris and desert camps under the stars." },
    ],
    travelTips: [
      "Heritage hotels book months ahead in peak winter — reserve early.",
      "Respect dress codes at temples and palace interiors.",
      "Keep afternoons light; the desert sun is strong even in winter.",
    ],
    gallery: [
      { src: u("photo-1599661046289-e31897846e41"), alt: "Hawa Mahal Jaipur" },
      { src: u("photo-1477587458883-47145ed94245"), alt: "Udaipur lake palace" },
      { src: u("photo-1524230572899-a752b3835840"), alt: "Jaisalmer desert dunes" },
    ],
    featured: true,
  },
  {
    id: "dest-nepal",
    slug: "nepal",
    name: "Nepal",
    country: "Nepal",
    region: "Himalaya · Kathmandu Valley",
    tagline: "Temple courtyards, Annapurna dawns",
    heroImage: u("photo-1544735716-392fe2489ffa"),
    thumbnail: u("photo-1544735716-392fe2489ffa", 900),
    overview:
      "Where the world's highest peaks meet ancient living cities. Wander the temple squares of Kathmandu, drift over Pokhara's Phewa Lake beneath the Annapurnas, and catch first light on the Himalaya from Nagarkot.",
    bestTimeToVisit:
      "October–November and March–April for clear mountain views and gentle trekking weather.",
    seasons: ["Autumn", "Spring"],
    tripTypes: ["Adventure", "Pilgrimage", "Group"],
    attractions: [
      { title: "Kathmandu Durbar Squares", description: "UNESCO temple courtyards of Patan, Bhaktapur and Kathmandu." },
      { title: "Pokhara & Phewa Lake", description: "Lakeside calm with the Annapurna range as backdrop." },
      { title: "Boudhanath Stupa", description: "One of the largest stupas in the world, ringed by monasteries." },
      { title: "Nagarkot Sunrise", description: "Panoramic Himalayan dawn an hour from the capital." },
    ],
    travelTips: [
      "Carry passport-size photos for trekking permits and TIMS cards.",
      "Domestic flights to Pokhara are weather-dependent — keep buffer days.",
      "Tipping guides and porters is customary and appreciated.",
    ],
    gallery: [
      { src: u("photo-1544735716-392fe2489ffa"), alt: "Himalaya peaks in Nepal" },
      { src: u("photo-1605640840605-14ac1855827b"), alt: "Nepal monastery" },
      { src: u("photo-1526772662000-3f88f10405ff"), alt: "Pokhara lake" },
    ],
    featured: false,
  },
  {
    id: "dest-bhutan",
    slug: "bhutan",
    name: "Bhutan",
    country: "Bhutan",
    region: "Eastern Himalaya",
    tagline: "Cliff monasteries, the land of happiness",
    heroImage: u("photo-1553856622-d1b352e9a211"),
    thumbnail: u("photo-1553856622-d1b352e9a211", 900),
    overview:
      "A kingdom that measures wealth in happiness. Hike to the Tiger's Nest clinging impossibly to a cliff, walk the fortress-monasteries of Paro and Thimphu, and travel a country where forests and tradition are protected by royal decree.",
    bestTimeToVisit:
      "March–May and September–November for clear skies and the colour of festival season.",
    seasons: ["Spring", "Autumn"],
    tripTypes: ["Luxury", "Adventure", "Pilgrimage"],
    attractions: [
      { title: "Tiger's Nest (Paro Taktsang)", description: "The iconic monastery on a 900-metre cliff face." },
      { title: "Punakha Dzong", description: "A majestic fortress at the meeting of two rivers." },
      { title: "Thimphu", description: "The world's only capital without traffic lights." },
      { title: "Dochula Pass", description: "108 chortens with a sweeping Himalayan horizon." },
    ],
    travelTips: [
      "Bhutan requires a Sustainable Development Fee — we handle the paperwork.",
      "Independent travel isn't permitted; all trips are guided by licensed operators.",
      "Pack sturdy shoes for the Tiger's Nest ascent.",
    ],
    gallery: [
      { src: u("photo-1553856622-d1b352e9a211"), alt: "Tiger's Nest monastery" },
      { src: u("photo-1571536802807-30451e3955d8"), alt: "Bhutan dzong fortress" },
      { src: u("photo-1605640840605-14ac1855827b"), alt: "Himalayan prayer flags" },
    ],
    featured: false,
  },
  {
    id: "dest-sri-lanka",
    slug: "sri-lanka",
    name: "Sri Lanka",
    country: "Sri Lanka",
    region: "Indian Ocean · Hill Country & Coast",
    tagline: "Tea trains, ancient cities, palm coasts",
    heroImage: u("photo-1566296314736-6eaac1ca0cb9"),
    thumbnail: u("photo-1566296314736-6eaac1ca0cb9", 900),
    overview:
      "An island that packs continents into days — misty tea country, leopard-prowled parks, golden southern beaches and the sacred cities of the cultural triangle. Ride the famous hill train and end with sand between your toes.",
    bestTimeToVisit:
      "December–March for the south and west coasts and hill country; May–September for the east.",
    seasons: ["Winter", "Spring"],
    tripTypes: ["Family", "Honeymoon", "Wildlife"],
    attractions: [
      { title: "Kandy to Ella Train", description: "One of the world's most scenic rail journeys through tea hills." },
      { title: "Sigiriya Rock Fortress", description: "An ancient palace atop a sheer rock monolith." },
      { title: "Yala National Park", description: "Among the best places on earth to spot leopards." },
      { title: "Galle Fort", description: "A Dutch-colonial walled town on the southern coast." },
    ],
    travelTips: [
      "Reserve first-class train seats Kandy–Ella well ahead.",
      "Monsoon hits coasts at opposite times — plan the route by season.",
      "Dress modestly at temples; remove shoes and hats.",
    ],
    gallery: [
      { src: u("photo-1566296314736-6eaac1ca0cb9"), alt: "Sri Lanka tea country train" },
      { src: u("photo-1546708973-b339540b5162"), alt: "Sigiriya rock fortress" },
      { src: u("photo-1552055568-f8a45d6e3a5b"), alt: "Galle fort coast" },
    ],
    featured: false,
  },
];
