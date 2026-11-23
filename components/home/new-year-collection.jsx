"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/home/product-card";
import { getContent } from "@/lib/data";

export function NewYearCollection({ lang }) {
  const { products, ui } = getContent(lang);
  const { title, intro, items, href, cta } = products.newYear;
  const [api, setApi] = useState(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback((a) => {
    setProgress(Math.max(0, Math.min(1, a.scrollProgress())));
    setCanPrev(a.canScrollPrev());
    setCanNext(a.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    api.on("scroll", sync).on("reInit", sync).on("select", sync);
    return () => api.off("scroll", sync).off("reInit", sync).off("select", sync);
  }, [api, sync]);

  return (
    <section aria-labelledby="yeni-yil-baslik" className="section-y overflow-hidden bg-wc">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <h2 id="yeni-yil-baslik" className="display-lg">
              {title}
            </h2>
            <p className="mt-5 max-w-[44ch] text-lg italic text-ink/70">{intro}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center gap-6">
            <a href={href} className="ui-label link-underline tap-target text-[0.9375rem]">
              {cta} ({items.length})
            </a>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={ui.a11y.prevProducts}
                disabled={!canPrev}
                onClick={() => api?.scrollPrev()}
                className="inline-flex size-12 items-center justify-center rounded-full border border-ink/30 transition-colors hover:bg-ink hover:text-wc disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label={ui.a11y.nextProducts}
                disabled={!canNext}
                onClick={() => api?.scrollNext()}
                className="inline-flex size-12 items-center justify-center rounded-full border border-ink/30 transition-colors hover:bg-ink hover:text-wc disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal y={40}>
          <Carousel setApi={setApi} opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }} aria-label={title}>
            <CarouselContent className="-ml-5 md:-ml-7">
              {items.map((product) => (
                <CarouselItem
                  key={product.handle}
                  className="basis-[78%] pl-5 sm:basis-[44%] md:pl-7 lg:basis-1/4"
                >
                  <ProductCard product={product} lang={lang} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-12 h-px w-full bg-ink/15" aria-hidden="true">
            <div
              className="h-px origin-left bg-ink transition-transform duration-200"
              style={{ transform: `scaleX(${Math.max(0.12, progress)})` }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
