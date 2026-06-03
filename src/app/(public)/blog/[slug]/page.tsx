import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/cards/blog-card";
import { PlanTripButton } from "@/components/inquiry/plan-trip-button";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { formatDate, slugify } from "@/lib/utils";
import { getBlogPosts, getPostBySlug, getRelatedPosts } from "@/server/repositories";

export async function generateStaticParams() {
  const list = await getBlogPosts();
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    type: "article",
    keywords: post.tags,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: post.title },
        ]}
      />

      <article className="py-12 lg:py-16">
        <Container size="narrow">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-6 text-sm text-ink-muted">
            <span className="font-medium text-ink">{post.author.name}</span>
            <span>·</span>
            <span>{post.author.role}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readMinutes} min read</span>
          </div>

          {/* Cover */}
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg">
            <Image src={post.coverImage} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>

          {/* Table of contents */}
          <nav className="mt-10 rounded-lg border border-line bg-sand/60 p-5" aria-label="Table of contents">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">In this article</p>
            <ol className="mt-3 space-y-2 text-sm">
              {post.content.map((s) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`} className="text-ink-soft transition-colors hover:text-gold-deep">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Body */}
          <div className="mt-10 space-y-10">
            <p className="font-heading text-xl leading-relaxed text-ink-soft">{post.excerpt}</p>
            {post.content.map((section) => (
              <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-28">
                <h2 className="font-heading text-2xl text-ink md:text-3xl">{section.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{section.body}</p>
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-8">
            {post.tags.map((t) => <Badge key={t} variant="sand" size="md">#{t}</Badge>)}
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-xl bg-ink p-8 text-center text-cream">
            <h2 className="font-heading text-2xl">Inspired to travel?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-cream/70">
              Let our specialists turn this into a journey designed entirely around you.
            </p>
            <PlanTripButton variant="gold" size="lg" className="mt-5">Plan My Trip</PlanTripButton>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="bg-sand py-16 lg:py-20">
          <Container>
            <h2 className="font-heading text-3xl text-ink">Related reading</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
