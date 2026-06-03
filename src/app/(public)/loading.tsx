import { Container } from "@/components/ui/container";

/** Route-level loading skeleton. */
export default function Loading() {
  return (
    <Container className="py-40">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-line" />
        <div className="h-12 w-2/3 rounded bg-line" />
        <div className="h-4 w-1/2 rounded bg-line" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/3] rounded-lg bg-line" />
              <div className="h-4 w-3/4 rounded bg-line" />
              <div className="h-4 w-1/2 rounded bg-line" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
