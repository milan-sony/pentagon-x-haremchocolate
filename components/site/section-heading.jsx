import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Section title + optional intro. Uses the display face; the intro is set in
 * Garamond italic, mirroring the brand guide's captions.
 */
export function SectionHeading({ title, intro, align = "left", tone = "ink", className, id, children }) {
  const centered = align === "center";
  return (
    <Reveal className={cn("flex flex-col gap-5", centered && "items-center text-center", className)}>
      <h2 id={id} className={cn("display-lg max-w-[16ch]", tone === "wc" ? "text-wc" : "text-ink")}>
        {title}
      </h2>
      {intro ? (
        <p className={cn("max-w-[46ch] text-lg italic", tone === "wc" ? "text-wc/75" : "text-ink/70")}>{intro}</p>
      ) : null}
      {children}
    </Reveal>
  );
}
