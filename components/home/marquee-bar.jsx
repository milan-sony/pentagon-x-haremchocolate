import Image from "next/image";
import { getContent } from "@/lib/data";

/** Caramel trust band. Items are facts from the live site / brand guide. */
export function MarqueeBar({ lang }) {
  const { brand, marquee, ui } = getContent(lang);
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marquee.map((item) => (
        <li key={item} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-display text-[1.75rem] leading-none md:text-[2.25rem]">{item}</span>
          <Image src={brand.logos.emblemBlack} alt="" width={500} height={499} className="size-7 md:size-8" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={ui.a11y.marquee} className="overflow-hidden border-y border-ink/20 bg-caramel py-5 text-ink md:py-6">
      <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ "--marquee-duration": "46s" }}>
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
