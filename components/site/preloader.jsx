"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { markRevealed } from "@/components/motion/use-revealed";
import { PRELOADER_SESSION_KEY } from "@/components/site/preloader-boot";
import { brand } from "@/lib/data";

// Timed from navigation start: the CSS entrance begins at first paint, not at hydration.
const MIN_MS = 1700; // ring finishes drawing (~1.45s) + a short hold — reads as intentional
const MAX_MS = 3200; // never hold the shop hostage to a slow image
const CURTAIN = [0.76, 0, 0.24, 1];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Set once by the <head> boot script, before hydration; never changes afterwards.
const noopSubscribe = () => () => {};
const useBootSkipped = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => document.documentElement.dataset.preloader === "skip",
    () => false,
  );

/** Resolves when the first hero photo has loaded (or failed). */
function heroImageReady() {
  const img = document.querySelector("section[aria-roledescription=carousel] img");
  if (!img || img.complete) return Promise.resolve();
  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
}

/**
 * Brand preloader: the gold HC emblem settles in while a caramel ring draws
 * around it and a gold glint passes across; the wordmark rises beneath.
 * Holds until fonts + the first hero photo are ready (min 1.4s, max 3.2s),
 * then lifts like a curtain as the hero title rises.
 */
export function Preloader() {
  const skipped = useBootSkipped(); // repeat visit this session, or reduced motion
  const [leaving, setLeaving] = useState(false);
  const lenis = useLenis();

  // Wait for real readiness, bounded by MIN_MS / MAX_MS, then lift.
  useEffect(() => {
    if (skipped) return;
    let cancelled = false;
    const elapsed = performance.now();
    const ready = Promise.all([wait(MIN_MS - elapsed), document.fonts?.ready, heroImageReady()]);
    Promise.race([ready, wait(MAX_MS - elapsed)]).then(() => {
      if (cancelled) return;
      try {
        sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
      } catch {
        /* private mode: just show it again next time */
      }
      setLeaving(true);
      markRevealed(); // hero starts rising together with the curtain
    });
    return () => {
      cancelled = true;
    };
  }, [skipped]);

  // Hold smooth scrolling while the curtain is down.
  useEffect(() => {
    if (!lenis || skipped) return;
    if (leaving) lenis.start();
    else lenis.stop();
  }, [lenis, skipped, leaving]);

  // Skipped on this visit: render nothing (the boot CSS already hid the SSR markup).
  if (skipped) return null;

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[200] grid place-items-center bg-ink"
          aria-hidden="true"
          exit={{ y: "-100%", transition: { duration: 0.95, ease: CURTAIN } }}
        >
          <motion.div
            className="flex flex-col items-center"
            exit={{ y: -60, opacity: 0, transition: { duration: 0.5, ease: CURTAIN } }}
          >
            <div className="relative size-36 md:size-44">
              {/* caramel ring drawing around the emblem — the "progress" */}
              <svg className="absolute -inset-[12%] size-[124%] -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" fill="none" stroke="rgb(188 125 30 / 0.18)" strokeWidth="0.5" />
                <circle
                  className="preloader-ring"
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke="#BC7D1E"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  pathLength="1"
                />
              </svg>
              <div className="preloader-emblem absolute inset-0">
                <Image src={brand.logos.emblemGold} alt="" fill sizes="176px" preload className="object-contain" />
                {/* gold glint, masked to the emblem's own shape */}
                <span className="preloader-shine absolute inset-0" style={{ "--emblem": `url(${brand.logos.emblemGold})` }} />
              </div>
            </div>
            <div className="preloader-wordmark relative mt-9 w-[210px] md:w-[250px]" style={{ aspectRatio: "1256 / 226" }}>
              <Image src={brand.logos.wordmarkLight} alt="" fill sizes="250px" preload className="object-contain" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
