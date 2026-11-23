import Image from "next/image";
import { Parallax, ParallaxFrame } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";
import { getContent } from "@/lib/data";

export function GrandTablette({ lang }) {
  const { brand, features } = getContent(lang);
  const f = features.grandTablette;
  return (
    <section aria-labelledby="grand-tablette-baslik" className="section-y relative overflow-hidden bg-wc pt-0 md:pt-0">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* image column */}
        <div className="relative lg:col-span-6">
          <div className="absolute -bottom-5 -left-5 top-5 right-5 rounded-[2px] border border-caramel md:-bottom-8 md:-left-8 md:right-8 md:top-8" aria-hidden="true" />
          <Reveal y={40}>
            <ParallaxFrame className="aspect-[4/5] rounded-[2px] bg-ink" intensity={9}>
              <Image src={f.image} alt={f.alt} fill sizes="(min-width:1024px) 46vw, 92vw" className="object-cover" />
            </ParallaxFrame>
          </Reveal>
          <Parallax speed={-110} className="absolute -bottom-10 right-2 w-[34%] md:-right-10 md:w-[38%] lg:-right-16">
            <div className="relative aspect-square overflow-hidden rounded-full bg-wc-soft shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)] ring-1 ring-ink/10">
              <Image src={f.detailImage} alt="" fill sizes="240px" className="object-contain p-[14%]" />
            </div>
          </Parallax>
        </div>

        {/* text column */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <h2 id="grand-tablette-baslik" className="display-feature">
              {f.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[40ch] text-lg text-ink/80">{f.text}</p>
            <ul className="mt-6 grid gap-4">
              {f.list.map((item) => (
                <li key={item} className="flex items-center gap-4 border-b border-ink/15 pb-4 font-arima text-xl">
                  <Image src={brand.logos.emblemGold} alt="" width={498} height={499} className="size-7 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 italic text-ink/60">{f.meta}</p>
            <CtaLink href={f.cta.href} variant="outline-ink" className="mt-10">
              {f.cta.label}
            </CtaLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
