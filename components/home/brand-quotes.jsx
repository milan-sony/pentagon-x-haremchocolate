"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { getContent } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Testimonial-style quote card. The live site has no customer reviews, so it
 * shows the brand's own words (testimonials.brandQuotes). If real reviews are
 * added to testimonials.reviews, they are shown instead.
 */
export function BrandQuotes({ lang }) {
  const { brand, testimonials, ui } = getContent(lang);
  const items = testimonials.reviews.length ? testimonials.reviews : testimonials.brandQuotes;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  // once someone picks a quote, rotation stops for good
  const [stopped, setStopped] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || stopped || reduce || items.length < 2) return;
    const t = setTimeout(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearTimeout(t);
  }, [i, paused, stopped, reduce, items.length]);

  const q = items[i];
  return (
    <section aria-label={ui.a11y.quotes} className="bg-wc pb-[clamp(4.5rem,10vw,9rem)]">
      <div className="container-x">
        <Reveal
          className="relative mx-auto max-w-5xl px-6 py-16 text-center md:px-20 md:py-24"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* corner brackets */}
          <span className="absolute left-0 top-0 size-14 border-l border-t border-caramel md:size-20" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 size-14 border-b border-r border-caramel md:size-20" aria-hidden="true" />

          <Image src={brand.logos.emblemGold} alt="" width={498} height={499} className="mx-auto size-14" />
          <div className="relative mt-8 min-h-[13rem] md:min-h-[11rem]" aria-live={stopped ? "polite" : "off"}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="font-display text-[clamp(1.75rem,3.4vw,2.875rem)] leading-[1.18] text-ink">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-7">
                  <span className="ui-label block text-[0.875rem]">{q.author}</span>
                  <span className="italic text-ink/60">{q.source}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          {items.length > 1 ? (
            <div className="mt-6 flex justify-center">
              {items.map((item, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setI(n);
                    setStopped(true);
                  }}
                  aria-label={ui.a11y.showQuote(n + 1)}
                  aria-current={n === i}
                  className="group flex h-11 min-w-11 items-center justify-center px-1"
                >
                  <span
                    className={cn(
                      "block h-px transition-[width,background-color] duration-500",
                      n === i ? "w-10 bg-ink" : "w-5 bg-ink/30 group-hover:bg-ink/60",
                    )}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
