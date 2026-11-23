import Image from "next/image";
import { ParallaxFrame } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";
import { getContent } from "@/lib/data";

export function KakaoPodBanner({ lang }) {
  const { features } = getContent(lang);
  const k = features.kakaoPod;
  return (
    <section aria-labelledby="kakao-pod-baslik" className="relative isolate overflow-hidden bg-chocolate text-white">
      <div className="grid lg:grid-cols-2">
        <div className="container-x relative flex flex-col justify-center py-20 md:py-28 lg:max-w-none lg:pl-[max(3.5rem,calc((100vw-88rem)/2+3.5rem))] lg:pr-16">
          <Reveal>
            <h2 id="kakao-pod-baslik" className="display-feature">
              {k.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-white/90 md:text-xl">{k.text}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label={k.variantsLabel}>
              {k.variants.map((v) => (
                <li key={v} className="ui-label rounded-full border border-white/45 px-4 py-2 text-[0.875rem]">
                  {v}
                </li>
              ))}
            </ul>
            <CtaLink href={k.cta.href} variant="ink" className="mt-10">
              {k.cta.label}
            </CtaLink>
          </Reveal>
        </div>
        <ParallaxFrame className="min-h-[420px] lg:min-h-[720px]" intensity={10}>
          <Image src={k.image} alt={k.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </ParallaxFrame>
      </div>
    </section>
  );
}
