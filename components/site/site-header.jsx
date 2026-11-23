"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Icon } from "@/components/site/icons";
import { LOCALES, brand, getContent, localeMeta } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

export function SiteHeader({ lang }) {
  const { announcement, navigation, ui } = getContent(lang);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const solid = scrolled || megaOpen;
  const tone = solid ? "text-ink" : "text-wc";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar — collapses once the page scrolls */}
      <div
        className={cn(
          "grid bg-ink text-wc transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="container-x flex h-9 items-center justify-center gap-6 md:justify-between">
            <span className="hidden w-32 md:block" aria-hidden="true" />
            <p className="ui-label text-center text-[0.8125rem] text-wc/90">
              <span className="text-caramel">✦</span> {announcement.text}
            </p>
            <p className="ui-label hidden w-32 justify-end text-[0.8125rem] text-wc/60 md:flex">{announcement.currency}</p>
          </div>
        </div>
      </div>

      <div
        onMouseLeave={closeMegaSoon}
        className={cn(
          "relative transition-[background-color,box-shadow,backdrop-filter] duration-500",
          solid
            ? "bg-wc/95 shadow-[0_1px_0_rgb(0_0_0/0.12)]"
            : "bg-gradient-to-b from-ink/55 to-transparent",
        )}
      >
        <div
          className={cn(
            "container-x grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-500",
            scrolled ? "h-16" : "h-20",
          )}
        >
          {/* left: mobile menu + utility links */}
          <div className={cn("flex items-center gap-1", tone)}>
            <MobileMenu tone={tone} lang={lang} navigation={navigation} ui={ui} />
            {navigation.utility.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="hidden size-10 items-center justify-center rounded-full transition-colors hover:text-caramel md:inline-flex"
              >
                <Icon name={item.icon} className="size-[1.15rem]" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* centre: logo (light over the hero, dark when solid) */}
          <Link href={`/${lang}`} aria-label={ui.a11y.home} className="relative block">
            <span
              className={cn(
                "relative block transition-[width] duration-500",
                scrolled ? "w-[150px] md:w-[176px]" : "w-[170px] md:w-[214px]",
              )}
              style={{ aspectRatio: "1366 / 410" }}
            >
              <Image
                src={brand.logos.primaryLight}
                alt=""
                fill
                sizes="214px"
                preload
                className={cn("object-contain transition-opacity duration-500", solid ? "opacity-0" : "opacity-100")}
              />
              <Image
                src={brand.logos.primary}
                alt={ui.a11y.logoAlt}
                fill
                sizes="214px"
                className={cn("object-contain transition-opacity duration-500", solid ? "opacity-100" : "opacity-0")}
              />
            </span>
          </Link>

          {/* right: search / account / cart */}
          <div className={cn("flex items-center justify-end gap-0.5", tone)}>
            <LanguageSwitch lang={lang} label={ui.languageSwitch} className="mr-2 hidden md:flex" />
            {navigation.actions.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full transition-colors hover:text-caramel",
                  item.icon === "account" && "hidden sm:inline-flex",
                )}
              >
                <Icon name={item.icon} className="size-[1.15rem]" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Desktop navigation */}
        <nav aria-label={ui.a11y.mainNav} className={cn("hidden lg:block", tone)}>
          <ul className="flex items-center justify-center gap-10 pb-4">
            {navigation.main.map((item) =>
              item.mega ? (
                <li key={item.label} onMouseEnter={openMega}>
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="mega-chocolate"
                    onClick={() => setMegaOpen((v) => !v)}
                    onFocus={openMega}
                    className="ui-label link-draw tap-target inline-flex items-center gap-1.5 py-1 text-[0.9375rem] transition-colors hover:text-caramel"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("size-3.5 transition-transform duration-300", megaOpen && "rotate-180")}
                      strokeWidth={1.5}
                    />
                  </button>
                </li>
              ) : (
                <li key={item.label} onMouseEnter={closeMegaSoon}>
                  <a href={item.href} className="ui-label link-draw tap-target py-1 text-[0.9375rem] transition-colors hover:text-caramel">
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <MegaMenu open={megaOpen} onEnter={openMega} onClose={() => setMegaOpen(false)} navigation={navigation} ui={ui} />
      </div>
    </header>
  );
}

function MegaMenu({ open, onEnter, onClose, navigation, ui }) {
  const mega = navigation.main.find((i) => i.mega)?.mega;
  if (!mega) return null;
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mega-chocolate"
          onMouseEnter={onEnter}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute inset-x-0 top-full hidden border-t border-ink/10 bg-wc shadow-[0_24px_40px_-24px_rgb(0_0_0/0.35)] lg:block"
        >
          <div className="container-x grid grid-cols-12 gap-10 py-10">
            <div className="col-span-8">
              <div className="mb-6 flex items-baseline justify-between border-b border-ink/15 pb-4">
                <p className="font-display text-3xl">{mega.heading}</p>
                <a href={mega.allHref} onClick={onClose} className="ui-label link-underline text-[0.875rem]">
                  {ui.megaMenu.all}
                </a>
              </div>
              <ul className="grid grid-cols-3 gap-x-8 gap-y-3.5">
                {mega.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} onClick={onClose} className="font-arima text-[1.0625rem] font-light text-ink/80 transition-colors hover:text-caramel">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a href={mega.feature.href} onClick={onClose} className="group relative col-span-4 block overflow-hidden rounded-[2px] bg-ink">
              <div className="relative aspect-[16/10]">
                <Image
                  src={mega.feature.image}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover opacity-80 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 text-wc">
                <p className="font-display text-2xl">{mega.feature.title}</p>
                <p className="italic text-wc/80">{mega.feature.text}</p>
              </div>
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MobileMenu({ tone, lang, navigation, ui }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={ui.a11y.openMenu}
          className={cn("inline-flex size-10 items-center justify-center rounded-full lg:hidden", tone)}
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm gap-0 overflow-y-auto overscroll-contain border-ink/10 bg-wc p-0 text-ink">
        <SheetTitle className="sr-only">{ui.a11y.menu}</SheetTitle>
        <div className="border-b border-ink/10 px-6 pb-5 pt-6">
          <div className="relative w-[160px]" style={{ aspectRatio: "1366 / 410" }}>
            <Image src={brand.logos.primary} alt="Harem Chocolate" fill sizes="160px" className="object-contain" />
          </div>
        </div>
        <nav aria-label={ui.a11y.mobileNav} className="px-6 py-4">
          <ul className="divide-y divide-ink/10">
            {navigation.main.map((item) =>
              item.mega ? (
                <li key={item.label}>
                  <details className="group py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-display text-2xl">
                      {item.label}
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" strokeWidth={1.5} />
                    </summary>
                    <ul className="grid gap-2.5 pb-4 pl-1">
                      {item.mega.links.map((l) => (
                        <li key={l.label}>
                          <a href={l.href} className="font-arima font-light text-ink/75" onClick={() => setOpen(false)}>
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.label}>
                  <a href={item.href} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl">
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="mt-auto grid gap-3 border-t border-ink/10 px-6 py-6">
          {[...navigation.utility, ...navigation.actions.filter((a) => a.icon === "account")].map((item) => (
            <a key={item.label} href={item.href} className="ui-label inline-flex items-center gap-3 text-ink/80">
              <Icon name={item.icon} className="size-4" strokeWidth={1.5} />
              {item.label}
            </a>
          ))}
          <a href={navigation.faq.href} className="ui-label text-ink/60">
            {navigation.faq.label}
          </a>
          <LanguageSwitch lang={lang} label={ui.languageSwitch} className="mt-3" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

/** EN / TR switch. Links to the other locale's prerendered page. */
function LanguageSwitch({ lang, label, className }) {
  return (
    <nav aria-label={label} className={cn("ui-label flex items-center gap-1 text-[0.8125rem]", className)}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 ? <span aria-hidden="true" className="opacity-40">/</span> : null}
          {/* Full document navigation on purpose: a language change should reset
              all page state (open drawer, slide index) and <html lang>, and must
              not keep the other language alive in a hidden <Activity>. */}
          <a
            href={`/${l}`}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            aria-label={localeMeta[l].label}
            className={cn(
              "tap-target rounded-sm px-1 py-1 transition-colors hover:text-caramel",
              l === lang ? "font-semibold underline decoration-caramel decoration-[1.5px] underline-offset-[5px]" : "opacity-60",
            )}
          >
            {localeMeta[l].short}
          </a>
        </span>
      ))}
    </nav>
  );
}
