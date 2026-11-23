"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/** Lenis smooth scrolling for the whole document; off for reduced-motion users. */
export function SmoothScroll({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, anchors: { offset: -96 } }}>
      {children}
    </ReactLenis>
  );
}
