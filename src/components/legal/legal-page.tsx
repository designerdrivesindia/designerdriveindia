import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { formatDate } from "@/lib/utils";
import type { LegalDoc } from "@/data/legal";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: doc.title }]}
      />
      <section className="py-12 lg:py-16">
        <Container size="narrow">
          <p className="text-sm text-ink-muted">Last updated: {formatDate(doc.updated)}</p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{doc.intro}</p>
          <div className="mt-10 space-y-9">
            {doc.sections.map((s, i) => (
              <section key={s.heading}>
                <h2 className="font-heading text-2xl text-ink">
                  <span className="mr-2 text-gold-deep">{i + 1}.</span>
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-sm leading-relaxed text-ink-soft">{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-12 rounded-lg bg-sand p-5 text-sm text-ink-muted">
            Questions about this policy? Email us at{" "}
            <a href="mailto:journeys@designerdrivesindia.com" className="font-medium text-ink underline underline-offset-2">
              journeys@designerdrivesindia.com
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
