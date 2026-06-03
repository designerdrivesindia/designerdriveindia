"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, forward this to your monitoring service.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center bg-sand">
      <Container className="py-24 text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 font-heading text-3xl text-ink md:text-4xl">
          We hit an unexpected bump
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-ink-muted">
          Sorry about that. Try again, or head back home — our team has been notified.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="lg" onClick={reset}>Try Again</Button>
          <ButtonLink href="/" variant="outline" size="lg">Back Home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
