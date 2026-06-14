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
    updated: "2026-06-14",
    intro: `${company} respects your privacy and is committed to protecting your personal information. This Privacy Policy explains what we collect when you browse our website or book a travel service, and how we use it.`,
    sections: [
      {
        heading: "Information we collect",
        body: [
          "We may collect the following information:",
          "• Name",
          "• Email address",
          "• Phone number",
          "• Nationality",
          "• Travel preferences",
          "• Passport details (when required for bookings)",
        ],
      },
      {
        heading: "How we use your information",
        body: [
          "Your information may be used for processing reservations, providing travel services, customer support, travel updates and promotional offers.",
          "We do not sell, rent, or trade customer information to third parties.",
        ],
      },
      {
        heading: "Information sharing",
        body: [
          "We may share necessary information with hotels, airlines, transport providers, and government authorities where legally required.",
          "All information is handled securely and responsibly.",
        ],
      },
      {
        heading: "Data security",
        body: [
          "We implement reasonable security measures to protect customer information from unauthorized access, misuse, or disclosure. No method of transmission over the internet is fully secure, but we work to safeguard your information.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You may request access to, correction of, or deletion of your personal data at any time by contacting us. You can unsubscribe from marketing emails using the link in any such email.",
        ],
      },
    ],
  },
  "terms-and-conditions": {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    updated: "2026-06-14",
    intro: `These Terms & Conditions govern the use of the ${company} website and all travel-related services we provide. By accessing our website, making inquiries, or booking any travel service, you agree to be bound by these terms.`,
    sections: [
      {
        heading: "Booking policy",
        body: [
          "Bookings can be made through our website, email, WhatsApp, or directly with our team. To confirm a booking, an advance payment is required; the advance amount depends on the services booked.",
          "• Hotel reservations may require 25% to 100% advance payment depending on hotel policies.",
          "• Domestic flight and train tickets require 100% advance payment.",
          "• Customized tour packages require a deposit based on the itinerary and services included.",
          "The balance payment must be completed before or during the tour as agreed at the time of booking.",
        ],
      },
      {
        heading: "Pricing",
        body: [
          "All prices are quoted in Indian Rupees (INR) unless otherwise specified. Prices are subject to change due to:",
          "• Government taxes",
          "• Fuel price increases",
          "• Hotel tariff revisions",
          "• Airline fare changes",
          "• Currency fluctuations",
          "Any applicable increase will be communicated before final confirmation.",
        ],
      },
      {
        heading: "Booking modifications",
        body: [
          "We will make every reasonable effort to accommodate changes to confirmed bookings, including travel dates, hotel preferences, flight schedules, vehicle upgrades and additional services.",
          "Any additional costs arising from modifications will be payable by the guest.",
        ],
      },
      {
        heading: "Travel documents",
        body: [
          "Guests are responsible for ensuring they possess a valid passport, appropriate visa, travel insurance and vaccination certificates (if required).",
          "Designer Drives India is not responsible for denied entry due to insufficient travel documentation.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Designer Drives India acts as a tour operator and service coordinator. While we carefully select our suppliers and partners, we shall not be liable for airline delays or cancellations, train delays, hotel overbookings, natural disasters, government restrictions, political disturbances, loss of personal belongings or medical emergencies.",
          "Our liability shall be limited to the value of the services booked directly through us.",
        ],
      },
      {
        heading: "Disclaimer",
        body: [
          "The information provided on this website is for general informational purposes only. While we strive to keep all information accurate and up to date, we make no guarantees regarding the accuracy of content, availability of services, hotel descriptions, destination information or third-party services.",
          "Designer Drives India shall not be held responsible for any direct, indirect, incidental or consequential loss resulting from the use of our website or travel services. We reserve the right to update website content, itineraries, pricing and policies without prior notice.",
        ],
      },
    ],
  },
  "cancellation-policy": {
    slug: "cancellation-policy",
    title: "Cancellation Policy",
    updated: "2026-06-14",
    intro: `We understand that travel plans may change. This Cancellation Policy is designed to be fair and transparent. Specific terms are always confirmed in writing at the time of booking.`,
    sections: [
      {
        heading: "Cancellation requests",
        body: [
          "All cancellations must be submitted in writing via email, WhatsApp, or our official contact form.",
          "Cancellation charges are calculated from the date we receive written notification.",
        ],
      },
      {
        heading: "Cancellation charges",
        body: [
          "More than 45 days before arrival: full refund of advance payment, less bank charges, payment gateway fees and non-refundable supplier charges.",
          "30 to 45 days before arrival: 25% cancellation charge on total tour cost.",
          "15 to 29 days before arrival: 50% cancellation charge on total tour cost.",
          "Less than 15 days before arrival: no refund.",
        ],
      },
      {
        heading: "Non-refundable services",
        body: [
          "The following may be non-refundable regardless of cancellation date:",
          "• Flight tickets",
          "• Train tickets",
          "• Special event bookings",
          "• Peak season hotel reservations",
          "• Government permit fees",
        ],
      },
    ],
  },
  "refund-policy": {
    slug: "refund-policy",
    title: "Refund & Payment Policy",
    updated: "2026-06-14",
    intro: `This policy explains how approved refunds are processed and the secure online payment options available for trips arranged with ${company}.`,
    sections: [
      {
        heading: "Refund processing",
        body: [
          "Approved refunds will be processed within 10 to 15 business days after cancellation approval, in line with our Cancellation Policy and the recoverable amount from hotels, transport and other suppliers.",
        ],
      },
      {
        heading: "Online payments",
        body: [
          "Designer Drives India offers secure online payment options for your convenience. Accepted methods include:",
          "• Bank transfer",
          "• International wire transfer",
          "• Credit cards",
          "• Debit cards",
          "• UPI payments",
          "• PayPal (where applicable)",
          "Any transaction fees charged by banks, payment gateways or third-party processors shall be borne by the customer.",
        ],
      },
      {
        heading: "Payment confirmation",
        body: [
          "Upon successful payment, a confirmation receipt will be issued via email or WhatsApp. All payments are processed through secure payment systems to ensure customer safety and privacy.",
        ],
      },
    ],
  },
};

export const getLegalDoc = (slug: string) => legalDocs[slug];
