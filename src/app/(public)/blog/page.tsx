import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/cards/blog-card";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/server/repositories";

export const metadata: Metadata = buildMetadata({
  title: "Travel Blog",
  description:
    "Destination guides, seasonal advice and field notes from the road — written by the Designer Drives India travel specialists.",
  path: "/blog",
  keywords: ["India travel blog", "travel guides", "Kashmir guide", "Ladakh tips"],
});

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero
        eyebrow="The Blog"
        title="Stories & travel notes"
        intro="Guides, seasonal advice and field notes from the road — to help you travel better."
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Blog" }]}
      />

      <section className="py-14 lg:py-20">
        <Container>
          {/* Featured post */}
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-8 overflow-hidden rounded-xl border border-line bg-paper md:grid-cols-2"
              >
                <div className="relative aspect-[16/11] overflow-hidden md:aspect-auto">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <Badge variant="gold" size="sm" className="w-fit">{featured.category}</Badge>
                  <h2 className="mt-4 font-heading text-2xl leading-snug text-ink md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{featured.excerpt}</p>
                  <p className="mt-4 text-xs text-ink-muted">
                    {formatDate(featured.publishedAt)} · {featured.readMinutes} min read
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
                    Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Grid */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 80}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
