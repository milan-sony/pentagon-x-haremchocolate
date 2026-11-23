"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "framer-motion";

/**
 * Lenis smooth scrolling for the whole document; off for reduced-motion users.
 * MotionConfig makes every Framer Motion animation honour the OS
 * "reduce motion" setting (transforms are skipped, opacity still fades).
 */
export function SmoothScroll({ children }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      {reduce ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, anchors: { offset: -96 } }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
