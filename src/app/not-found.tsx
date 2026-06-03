import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-sand">
      <Container className="py-24 text-center">
        <p className="font-heading text-7xl font-semibold text-gold md:text-8xl">404</p>
        <h1 className="mt-4 font-heading text-3xl text-ink md:text-4xl">
          This path leads off the map
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-ink-muted">
          The page you&apos;re looking for has wandered off. Let&apos;s get you
          back to familiar ground.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary" size="lg">Back Home</ButtonLink>
          <ButtonLink href="/packages" variant="outline" size="lg">Browse Packages</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
