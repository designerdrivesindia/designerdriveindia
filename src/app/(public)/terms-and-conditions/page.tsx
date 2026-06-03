import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { buildMetadata } from "@/lib/seo";
import { getLegalDoc } from "@/data/legal";

const doc = getLegalDoc("terms-and-conditions");

export const metadata: Metadata = buildMetadata({
  title: doc.title,
  description: doc.intro,
  path: "/terms-and-conditions",
});

export default function Page() {
  return <LegalPage doc={doc} />;
}
