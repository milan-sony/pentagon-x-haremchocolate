"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";
import { formatPrice, getContent } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

function filterItems(items, id) {
  if (id === "vegan") return items.filter((p) => p.vegan);
  if (id === "sugarFree") return items.filter((p) => p.sugarFree);
  return items;
}

function PlateCard({ product, i, lang }) {
  const { ui } = getContent(lang);
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
      className="group w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-2rem)]"
    >
      <a href={product.href} className="flex flex-col items-center text-center">
        <div className="relative aspect-square w-full max-w-[17rem]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_38%,#4a4036,#1c1915_58%,#0d0c0a_80%)] ring-1 ring-wc/10 transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:ring-caramel/70" />
          <div className="absolute inset-[9%] overflow-hidden rounded-full">
            <Image
              src={product.image}
              alt={`${product.name}${product.variant ? `, ${product.variant}` : ""}`}
              fill
              sizes="(min-width:1024px) 18vw, 42vw"
              className={cn(
                "object-contain p-[8%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110",
                product.soldOut && "opacity-60 grayscale",
              )}
            />
          </div>
          {product.soldOut ? (
            <span className="ui-label absolute left-1/2 top-[6%] -translate-x-1/2 whitespace-nowrap rounded-full bg-wc px-3 py-1.5 text-[0.75rem] text-ink">
              {ui.product.soldOut}
            </span>
          ) : product.stock ? (
            <span className="ui-label absolute left-1/2 top-[6%] -translate-x-1/2 whitespace-nowrap rounded-full bg-caramel px-3 py-1.5 text-[0.75rem] text-ink">
              {ui.product.lowStock(product.stock)}
            </span>
          ) : null}
        </div>
        {product.badges.length ? (
          <div className="mt-5 flex gap-1.5">
            {product.badges.map((b) => (
              <span key={b} className="ui-label rounded-full border border-wc/30 px-2.5 py-1 text-[0.75rem] text-wc/80">
                {b}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-5 h-[1.625rem]" aria-hidden="true" />
        )}
        <h3 className="mt-3 font-arima text-lg font-normal leading-snug tracking-normal text-wc">{product.name}</h3>
        {product.variant ? <p className="italic leading-snug text-wc/60">{product.variant}</p> : null}
        <p className="ui-label mt-3 text-[0.9375rem] tabular-nums text-caramel">{formatPrice(product.price, lang)}</p>
      </a>
    </motion.li>
  );
}

export function BeanToBar({ lang }) {
  const { about, products, ui } = getContent(lang);
  const { title, intro, items, filters, href, cta } = products.beanToBar;
  return (
    <section aria-labelledby="bean-to-bar-baslik" className="section-y relative isolate overflow-hidden bg-ink text-wc">
      {/* falling chocolate (brand photography) drifting at the edge */}
      <Parallax speed={220} className="pointer-events-none absolute right-[3%] top-8 -z-10 hidden w-[11rem] opacity-80 md:block lg:right-[6%] lg:w-[14rem]" aria-hidden="true">
        <Image src={about.image} alt="" width={419} height={1176} sizes="14rem" className="h-auto w-full" />
      </Parallax>

      <div className="container-x">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 id="bean-to-bar-baslik" className="display-lg text-wc">
            {title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg italic text-wc/70">{intro}</p>
        </Reveal>

        <Tabs defaultValue="all" className="mt-12 items-center gap-12">
          <TabsList variant="line" aria-label={ui.a11y.filterProducts} className="h-auto gap-8 p-0">
            {filters.map((f) => (
              <TabsTrigger
                key={f.id}
                value={f.id}
                className="ui-label h-auto flex-none rounded-none px-1 py-3 text-[1rem] text-wc/70 hover:text-wc data-active:text-wc after:bg-caramel group-data-horizontal/tabs:after:bottom-0 focus-visible:ring-0"
              >
                {f.label}
                <span className="ml-1.5 text-[0.75rem] text-wc/60">{filterItems(items, f.id).length}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {filters.map((f) => (
            <TabsContent key={f.id} value={f.id} className="w-full text-base">
              <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-6 gap-y-14 lg:gap-x-12">
                {filterItems(items, f.id).map((product, i) => (
                  <PlateCard key={product.handle} product={product} i={i} lang={lang} />
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 flex justify-center">
          <CtaLink href={href} variant="outline-wc">
            {cta}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
