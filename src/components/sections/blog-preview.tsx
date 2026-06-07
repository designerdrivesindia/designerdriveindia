import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlogCard } from "@/components/cards/blog-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getBlogPosts } from "@/server/repositories";

export async function BlogPreview() {
  const posts = (await getBlogPosts()).slice(0, 3);
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The Blog"
            title="Stories & travel notes"
            intro="Guides, seasonal advice and field notes from the road, written by our destination specialists."
          />
          <ButtonLink href="/blog" variant="outline" size="md" className="hidden md:inline-flex">
            Read the Blog
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 90}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
