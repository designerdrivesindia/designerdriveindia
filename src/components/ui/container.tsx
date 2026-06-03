import { cn } from "@/lib/utils";

/** Max-width content wrapper with responsive horizontal padding. */
export function Container({
  className,
  children,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 md:px-10 xl:px-16",
        size === "default" && "max-w-7xl",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-[100rem]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
