export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

const company = "Designer Drives India";

export const legalDocs: Record<string, LegalDoc> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updated: "2025-01-01",
    intro: `This Privacy Policy explains how ${company} collects, uses and protects the personal information you share with us when you browse our website or send a travel inquiry.`,
    sections: [
      { heading: "Information we collect", body: ["When you submit an inquiry or subscribe to our newsletter, we collect details such as your name, email address, phone number, travel preferences and any message you provide.", "We also collect anonymous usage data (such as pages visited) to improve our website."] },
      { heading: "How we use your information", body: ["We use your information solely to respond to your travel inquiries, prepare itineraries and quotes, and — with your consent — send occasional travel updates.", "We never sell your personal information to third parties."] },
      { heading: "Data sharing", body: ["We may share limited details with trusted travel partners (hotels, transport providers) strictly to fulfil your trip, and only as necessary."] },
      { heading: "Data security", body: ["We apply reasonable technical and organisational measures to protect your data. No method of transmission over the internet is fully secure, but we work to safeguard your information."] },
      { heading: "Your rights", body: ["You may request access to, correction of, or deletion of your personal data at any time by contacting us. You can unsubscribe from marketing emails using the link in any such email."] },
    ],
  },
  "terms-and-conditions": {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    updated: "2025-01-01",
    intro: `These Terms & Conditions govern your use of the ${company} website and the travel-planning services we provide. By using our website you agree to these terms.`,
    sections: [
      { heading: "Nature of our service", body: ["Designer Drives India is a travel-planning and lead-generation service. Our website does not process direct bookings or payments online; all trips are arranged through direct communication with our team."] },
      { heading: "Inquiries & quotes", body: ["Prices shown are indicative starting points and are subject to availability, season and customisation. A final, confirmed quote is provided after we understand your requirements."] },
      { heading: "Bookings", body: ["A trip is only confirmed once a written confirmation and any required deposit have been exchanged directly with our team."] },
      { heading: "Liability", body: ["While we take great care in selecting partners, Designer Drives India is not liable for circumstances beyond our reasonable control, including weather, road closures or actions of third-party suppliers."] },
      { heading: "Intellectual property", body: ["All content on this website is the property of Designer Drives India and may not be reproduced without permission."] },
    ],
  },
  "cancellation-policy": {
    slug: "cancellation-policy",
    title: "Cancellation Policy",
    updated: "2025-01-01",
    intro: `This Cancellation Policy outlines what happens if you need to cancel a confirmed trip arranged with ${company}. Specific terms are always confirmed in writing at the time of booking.`,
    sections: [
      { heading: "How to cancel", body: ["To cancel a confirmed trip, please notify us in writing by email as early as possible. Cancellation takes effect from the date we receive your notice."] },
      { heading: "Cancellation charges", body: ["Cancellation charges depend on how far in advance you cancel and the policies of the hotels and suppliers involved.", "As a general guide: 30+ days before travel — minimal charges; 15–29 days — partial charges; under 15 days — higher charges may apply. Exact terms are confirmed at booking."] },
      { heading: "Supplier policies", body: ["Some hotels, houseboats and transport providers have their own non-refundable terms, especially during peak seasons. These are passed on as applicable."] },
      { heading: "Force majeure", body: ["In cases of natural disasters, government restrictions or other events beyond control, we will work with you to reschedule or recover whatever is possible from suppliers."] },
    ],
  },
  "refund-policy": {
    slug: "refund-policy",
    title: "Refund Policy",
    updated: "2025-01-01",
    intro: `This Refund Policy explains how refunds are handled for trips arranged with ${company}.`,
    sections: [
      { heading: "Eligibility", body: ["Refunds are calculated based on our Cancellation Policy and the recoverable amount from hotels, transport and other suppliers at the time of cancellation."] },
      { heading: "Processing time", body: ["Approved refunds are processed within 7–14 working days to the original payment method, after deducting applicable cancellation and supplier charges."] },
      { heading: "Non-refundable items", body: ["Certain costs — including confirmed non-refundable hotel nights, permits and special-event tickets — may not be refundable. These are clearly identified at the time of booking."] },
      { heading: "How to request a refund", body: ["To request a refund, contact our team in writing with your booking reference. We will share a clear breakdown before processing."] },
    ],
  },
};

export const getLegalDoc = (slug: string) => legalDocs[slug];
