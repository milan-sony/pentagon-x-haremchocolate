"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useRevealed } from "@/components/motion/use-revealed";
import { CtaLink } from "@/components/site/cta-link";
import { getContent } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

export function Hero({ lang }) {
  const { hero, ui } = getContent(lang);
  const { slides, autoplayMs } = hero;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef(null);
  const sectionRef = useRef(null);
  // autoplay + Ken Burns only while the hero is on screen (saves frames while scrolling)
  const inView = useInView(sectionRef, { amount: 0.15 });
  // the entrance waits for the preloader curtain (immediately true when it's skipped)
  const revealed = useRevealed();

  const count = slides.length;
  const go = (i) => setIndex((i + count) % count);
  const running = !paused && !hovering && inView && revealed;

  useEffect(() => {
    if (!running) return;
    timer.current = setTimeout(() => setIndex((index + 1) % count), autoplayMs);
    return () => clearTimeout(timer.current);
  }, [index, running, autoplayMs, count]);

  const slide = slides[index];

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label={ui.a11y.heroRegion}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      className="relative isolate flex min-h-[max(600px,100svh)] flex-col overflow-hidden bg-ink text-wc"
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 -z-20 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: i === index && !reduce && inView && revealed ? 1 : 1.1 }}
            transition={{ duration: i === index ? autoplayMs / 1000 + 1.6 : 0, ease: "linear" }}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="100vw"
              quality={85}
              {...(i === 0 ? { preload: true, fetchPriority: "high" } : { loading: "lazy" })}
              className="object-cover"
              style={{ objectPosition: s.position }}
            />
          </motion.div>
        </div>
      ))}

      {/* legibility washes */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(0_0_0/0.78)_0%,rgb(0_0_0/0.55)_38%,rgb(0_0_0/0.12)_68%,transparent_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-ink/80 to-transparent" />

      <div className="container-x flex flex-1 flex-col justify-end pb-28 pt-36 md:pb-32 lg:pt-48">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} className="max-w-5xl" aria-live={running ? "off" : "polite"}>
            <motion.p
              className="mb-5 font-serif text-lg italic text-wc/85 md:text-xl"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            >
              {slide.eyebrow}
            </motion.p>
            <h1 className="display-xl">
              {slide.title.split(" ").map((word, w, words) => (
                <span key={`${word}-${w}`}>
                  <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? false : { y: "105%" }}
                      animate={{ y: revealed ? 0 : "105%" }}
                      exit={{ y: "-105%", transition: { duration: 0.45, ease: EASE } }}
                      transition={{ duration: 1.05, ease: EASE, delay: 0.25 + w * 0.09 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {/* a real space between words so the heading reads correctly */}
                  {w < words.length - 1 ? " " : null}
                </span>
              ))}
            </h1>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              className="mt-7 flex flex-col gap-8 sm:flex-row sm:items-center"
            >
              <p className="max-w-[34ch] text-lg leading-relaxed text-wc/80 md:text-xl">{slide.subtitle}</p>
              <CtaLink href={slide.cta.href} variant="caramel" className="shrink-0 self-start sm:self-auto">
                {slide.cta.label}
              </CtaLink>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-x flex items-center gap-5 pb-5 md:gap-8 md:pb-8">
          <ol className="flex flex-1 gap-3" aria-label={ui.a11y.slides}>
            {slides.map((s, i) => (
              <li key={s.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={ui.a11y.slide(i + 1, s.title)}
                  aria-current={i === index}
                  className="group block w-full py-5 text-left md:py-3"
                >
                  <span className="relative block h-px w-full overflow-hidden bg-wc/25">
                    <span
                      key={`${index}-${running}`}
                      className="absolute inset-0 origin-left bg-caramel"
                      style={{
                        transform: i < index || (i === index && (!running || reduce)) ? "scaleX(1)" : "scaleX(0)",
                        animation:
                          i === index && running && !reduce
                            ? `hero-progress ${autoplayMs}ms linear forwards`
                            : undefined,
                      }}
                    />
                  </span>
                  <span
                    className={cn(
                      "ui-label mt-3 hidden text-[0.8125rem] transition-colors md:block",
                      i === index ? "text-wc" : "text-wc/45 group-hover:text-wc/80",
                    )}
                  >
                    {s.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? ui.a11y.play : ui.a11y.pause}
              className="inline-flex size-11 items-center justify-center rounded-full text-wc/80 transition-colors hover:text-caramel"
            >
              {paused ? <Play className="size-4" strokeWidth={1.5} /> : <Pause className="size-4" strokeWidth={1.5} />}
            </button>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={ui.a11y.prevSlide}
              className="inline-flex size-11 items-center justify-center rounded-full border border-wc/30 transition-colors hover:border-caramel hover:bg-caramel hover:text-ink"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={ui.a11y.nextSlide}
              className="inline-flex size-11 items-center justify-center rounded-full border border-wc/30 transition-colors hover:border-caramel hover:bg-caramel hover:text-ink"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
