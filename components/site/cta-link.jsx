import { cn } from "@/lib/utils";

const variants = {
  caramel: "bg-caramel text-ink before:bg-ink hover:text-wc",
  ink: "bg-ink text-wc before:bg-caramel hover:text-ink",
  wc: "bg-wc text-ink before:bg-caramel",
  "outline-ink": "border border-ink text-ink before:bg-ink hover:text-wc",
  "outline-wc": "border border-wc/70 text-wc before:bg-wc hover:text-ink",
};

/**
 * Primary call-to-action, rendered as a link. A colour layer sweeps up from
 * the bottom on hover. Brand rule: label in sentence case, never all caps.
 */
export function CtaLink({ href, children, variant = "caramel", className, external, ...rest }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "ui-label group relative isolate inline-flex h-12 items-center justify-center overflow-hidden rounded-[2px] px-7 text-[0.9375rem] transition-colors duration-500",
        "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:scale-y-100 focus-visible:before:scale-y-100",
        variants[variant],
        className,
      )}
      {...rest}
    >
      <span className="pt-[0.15em]">{children}</span>
    </a>
  );
}
