"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Moves its children along Y while the element crosses the viewport.
 * `speed` is the total travel in px (positive = moves up as you scroll down).
 */
export function Parallax({ children, speed = 80, className, style, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed / 2, -speed / 2]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }} {...rest}>
      {children}
    </motion.div>
  );
}

/**
 * Image-in-frame parallax: the frame stays put, the oversized inner layer drifts.
 * Wrap a `fill` <Image> inside.
 */
export function ParallaxFrame({ children, className, intensity = 12 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${intensity}%`, `${intensity}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div className="absolute inset-x-0" style={{ y, top: `-${intensity}%`, bottom: `-${intensity}%` }}>
        {children}
      </motion.div>
    </div>
  );
}
