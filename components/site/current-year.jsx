"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Footer year. Cache Components forbids `new Date()` during prerender, so the
 * server snapshot uses the build year and the browser reads the real date.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => process.env.NEXT_PUBLIC_BUILD_YEAR,
  );
  return <span suppressHydrationWarning>{year}</span>;
}
