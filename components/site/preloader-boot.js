/**
 * Runs inline in <head> before first paint (see app/[lang]/layout.js).
 * Skips the preloader on repeat visits in the same session and for
 * reduced-motion users; otherwise locks page scroll until it lifts.
 * Kept tiny and dependency-free on purpose.
 */
export const PRELOADER_SESSION_KEY = "harem-preloaded";

export const preloaderBootScript = `(function(){var d=document.documentElement;try{var seen=sessionStorage.getItem("${PRELOADER_SESSION_KEY}");var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(seen||rm){d.dataset.preloader="skip";d.dataset.revealed="true";}else{d.classList.add("pl-lock");}}catch(e){d.dataset.preloader="skip";d.dataset.revealed="true";}})();`;
