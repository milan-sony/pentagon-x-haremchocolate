"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";
import { brand, getContent } from "@/lib/data";

const il = brand.illustrations;

// deterministic star field (percent positions, size in px, animation delay in s)
const STARS = [
  [8, 12, 22, 0], [18, 34, 14, 1.2], [27, 8, 18, 2.1], [38, 22, 12, 0.6], [46, 6, 20, 1.8],
  [58, 18, 14, 2.6], [66, 9, 22, 0.3], [74, 28, 12, 1.5], [84, 14, 18, 2.9], [92, 36, 14, 0.9],
  [12, 54, 12, 2.3], [88, 58, 16, 1.1], [33, 44, 10, 3.1], [70, 46, 10, 0.4], [52, 34, 12, 2],
];

export function StorySection({ lang }) {
  const { about } = getContent(lang);
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const r = (a, b) => (reduce ? [0, 0] : [a, b]);

  // figures rise out of the bottom edge at different speeds; the -mb offsets keep
  // their column bases hidden over the whole range
  const sultanY = useTransform(scrollYProgress, [0, 1], r(150, -20));
  const beyY = useTransform(scrollYProgress, [0, 1], r(90, -30));
  const moonY = useTransform(scrollYProgress, [0, 1], r(-40, 120));
  const towerY = useTransform(scrollYProgress, [0, 1], r(60, -80));
  const maidenY = useTransform(scrollYProgress, [0, 1], r(100, -40));
  const starsY = useTransform(scrollYProgress, [0, 1], r(30, -30));
  const cloudX = useTransform(scrollYProgress, [0, 1], r(-60, 80));

  return (
    <section
      ref={ref}
      aria-labelledby="hikaye-baslik"
      className="relative isolate overflow-hidden bg-blueberry text-wc"
    >
      {/* night-sky depth */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_30%,rgb(255_255_255/0.07),transparent_60%),radial-gradient(ellipse_at_50%_110%,rgb(0_0_0/0.35),transparent_55%)]" />

      {/* stars */}
      <motion.div style={{ y: starsY }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {STARS.map(([x, y, s, d], i) => (
          <Image
            key={i}
            src={i % 3 === 0 ? il.sparkleBurst : i % 3 === 1 ? il.star : il.sparkleSmall}
            alt=""
            width={44}
            height={48}
            className="absolute animate-twinkle"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: "auto", animationDelay: `${d}s` }}
          />
        ))}
      </motion.div>

      {/* moon + towers */}
      <motion.div style={{ y: moonY }} className="pointer-events-none absolute right-[9%] top-[7%] w-12 md:w-16" aria-hidden="true">
        <Image src={il.moon} alt="" width={58} height={99} className="h-auto w-full -rotate-12" />
      </motion.div>
      <motion.div style={{ y: towerY }} className="pointer-events-none absolute left-[4%] top-[14%] hidden w-[11rem] md:block lg:left-[7%] lg:w-[13rem]" aria-hidden="true">
        <Image src={il.galataTower} alt="" width={175} height={161} className="h-auto w-full" />
      </motion.div>
      <motion.div style={{ y: maidenY }} className="pointer-events-none absolute right-[6%] top-[38%] hidden w-[7.5rem] md:block lg:right-[12%]" aria-hidden="true">
        <Image src={il.maidenTower} alt="" width={108} height={116} className="h-auto w-full animate-float" />
      </motion.div>
      <motion.div style={{ x: cloudX }} className="pointer-events-none absolute left-[38%] top-[5%] hidden w-28 opacity-80 md:block" aria-hidden="true">
        <Image src={il.cloud} alt="" width={125} height={88} className="h-auto w-full" />
      </motion.div>

      <div className="container-x relative grid min-h-[min(110vh,1040px)] items-end gap-x-6 pt-28 md:pt-36 lg:grid-cols-[1fr_minmax(0,36rem)_1fr]">
        {/* Sultan — left column, rising from below */}
        <motion.div style={{ y: sultanY }} className="pointer-events-none -mb-16 hidden justify-self-start lg:block">
          <Image
            src={il.sultan}
            alt={about.sultanAlt}
            width={500}
            height={1002}
            sizes="20rem"
            className="h-auto w-[min(19rem,100%)]"
          />
        </motion.div>

        {/* copy */}
        <div className="relative z-10 mx-auto flex max-w-[36rem] flex-col items-center self-center pb-16 text-center lg:pb-24">
          <Reveal>
            <p className="gold-text font-script text-[3.5rem] leading-none md:text-[4.75rem]">{about.script}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="hikaye-baslik" className="display-lg mt-4 text-wc">
              {about.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16} className="mt-8 space-y-5 text-lg leading-[1.75] text-wc/85">
            {about.paragraphs.map((para) => (
              <p key={para.slice(0, 20)}>{para}</p>
            ))}
          </Reveal>
          <Reveal delay={0.24}>
            <CtaLink href={about.cta.href} variant="outline-wc" className="mt-10">
              {about.cta.label}
            </CtaLink>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-14 max-w-[46ch] text-[0.9375rem] italic leading-relaxed text-wc/85">{about.caption}</p>
          </Reveal>
        </div>

        {/* Çikolatacı Bey — right column */}
        <motion.div style={{ y: beyY }} className="pointer-events-none -mb-16 hidden justify-self-end lg:block">
          <Image
            src={il.cikolataciBey}
            alt={about.beyAlt}
            width={335}
            height={702}
            sizes="16rem"
            className="h-auto w-[min(15.5rem,100%)]"
          />
        </motion.div>

        {/* mobile / tablet: the pair side by side under the copy */}
        <motion.div style={{ y: beyY }} className="pointer-events-none -mb-10 flex items-end justify-between lg:hidden" aria-hidden="true">
          <Image src={il.sultan} alt="" width={500} height={1002} sizes="44vw" className="h-auto w-[44%] max-w-[15rem]" />
          <Image src={il.cikolataciBey} alt="" width={335} height={702} sizes="36vw" className="h-auto w-[36%] max-w-[12rem]" />
        </motion.div>
      </div>
    </section>
  );
}
