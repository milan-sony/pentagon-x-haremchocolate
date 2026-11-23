"use client";

import { useSyncExternalStore } from "react";

/**
 * "Has the page been revealed?" — true once the preloader starts lifting,
 * or immediately when the preloader is skipped (repeat visit in this session,
 * reduced motion). The boot script in <head> sets data-revealed on <html> for
 * the skip case before first paint; the preloader sets it when it exits.
 */
export const REVEAL_EVENT = "harem:revealed";

const subscribe = (callback) => {
  window.addEventListener(REVEAL_EVENT, callback);
  return () => window.removeEventListener(REVEAL_EVENT, callback);
};
const getSnapshot = () => document.documentElement.dataset.revealed === "true";
const getServerSnapshot = () => false;

export function useRevealed() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function markRevealed() {
  const root = document.documentElement;
  root.dataset.revealed = "true";
  root.classList.remove("pl-lock");
  window.dispatchEvent(new Event(REVEAL_EVENT));
}
