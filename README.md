# Harem Chocolate — Home Page Redesign

Next.js 16 (App Router, JavaScript) · Tailwind CSS 4 · shadcn/ui (Radix) · Framer Motion · Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Languages

The page is bilingual: **`/en`** and **`/tr`**, both prerendered as static pages
(`app/[lang]/`). `proxy.js` redirects `/` to Turkish or English based on the
browser's `Accept-Language` (English by default); unknown locales return 404.
Each page sets its own `<html lang>`, title, description, `og:locale` and
`hreflang` alternates. The EN / TR switcher sits in the header (and in the
mobile menu); it does a full page load so all page state resets cleanly.

## Preloader

`components/site/preloader.jsx`: the gold HC emblem settles in while a caramel ring
draws around it, a gold glint passes across, and the wordmark rises; then the
black panel lifts like a curtain as the hero title rises (`useRevealed`).

- The entrance is pure CSS (`app/globals.css`, "Preloader"), so it starts at first paint.
- It lifts once fonts and the first hero photo are ready: at least 1.7 s, at most 3.2 s
  from navigation start (about 1.75 s on a warm load).
- It shows **once per browser session**. Reloads, EN/TR switches and reduced-motion
  visitors skip it. `components/site/preloader-boot.js` decides this inline in
  `<head>` before first paint, so there is no flash.
- Fail-safe: if JavaScript never runs, a CSS timer removes the overlay after 5 s.

## Content

All copy, products, prices, links and image paths live in **`lib/data.js`**
(`hero`, `products`, `about`, `testimonials`, `features`, `contact`,
`navigation`, `footer`, plus `brand`, `seo`, `categories`, `marquee`, `ui`).
Every text field is written once as `L("English", "Türkçe")` next to its
shared data (prices, images, links); components call `getContent(lang)` and
`formatPrice(value, lang)`. Nothing is hardcoded in components.

Content was taken from the live haremchocolate.com home page (and its About,
Stores and Corporate pages) on 2026-11-23. The Turkish text is the live copy;
the English text is a translation of it (the live site is Turkish-only). Brand/product names (Madlen, Merhaba, Joy Selection,
Grand Tablette) and the stores' postal addresses are kept as published; the
story caption is the brand guide's own English text. Links point to the live
(Turkish) Shopify store, because only the home page is rebuilt here. Prices
(TL) and stock reflect that date.

## Sections (live site order → new design)

| Live site | New component |
|---|---|
| Announcement bar, header + Çikolata mega menu | `components/site/site-header.jsx` |
| Hero slider (3 slides) | `components/home/hero.jsx` |
| — (new) trust marquee | `components/home/marquee-bar.jsx` |
| Yeni Yıl Koleksiyonu (20 products) | `components/home/new-year-collection.jsx` |
| Grand Tablette | `components/home/grand-tablette.jsx` |
| — (new) parallax story, About page copy + brand illustrations | `components/home/story-section.jsx` |
| Bean to Bar Koleksiyonu (9 products) | `components/home/bean-to-bar.jsx` |
| Kakao Pod Koleksiyonu | `components/home/kakao-pod-banner.jsx` |
| Çikolata Çeşitlerimiz | `components/home/categories.jsx` |
| — (new) brand quotes (testimonial slot) | `components/home/brand-quotes.jsx` |
| En Tatlı Hediye / Mağazalarımızı Keşfedin | `components/home/services.jsx`, `components/home/stores.jsx` |
| — (new) corporate orders + newsletter | `components/home/corporate-newsletter.jsx` |
| Footer | `components/site/site-footer.jsx` |

## Brand (from "2-Brand Visual & Social Media.pdf")

- **Colours** (`app/globals.css` → `@theme`): Black `#000000`, Blueberry `#484680`,
  Caramel `#BC7D1E`, White Chocolate `#DAD4C1`, Chocolate `#BC4917`, Gold (gradient).
- **Logos / emblem / stickers**: `public/assets/brand/` (transparent PNG, with `-light` variants for dark backgrounds).
- **Illustrations** (Sedat Girgin): `public/assets/illustrations/`.
- **Fonts** (licence status checked 2026-11-23):

  | Brand guide font | On the site | Status |
  |---|---|---|
  | Garamond (guide uses Garamond Three) | EB Garamond | free (OFL) equivalent; Garamond Three is commercial |
  | Arima Madurai | Arima (same family, renamed on Google Fonts) | free (OFL), **light 300 for details** per the guide |
  | Algiers | Forum (stand-in) | commercial: Ivan Rosenberg (YouWorkForThem / Fontpath) |
  | Chap Light | Josefin Sans (stand-in) | commercial: Schick Toikka |
  | Neutraface Text | Josefin Sans (stand-in) | commercial: House Industries (webfont licence) |
  | Starlit Drive | Mrs Saint Delafield (stand-in) | commercial: Set Sail Studios (webfont licence) |

  Fonts used in the Canva brand guide can't be reused outside Canva under Canva's
  licence. Once licensed `.woff2` files are supplied, load them with
  `next/font/local` in `app/[lang]/layout.js` and point the `--font-display`,
  `--font-sans` and `--font-script` variables at them. No component changes are needed.
- **"Never use all caps"**: applied site-wide. Nav, buttons and labels use sentence/title case.

## Open items

- **Testimonials**: the live site publishes none, so `testimonials.reviews` is empty
  and the quote card shows attributed brand statements. Add real reviews to show them instead.
- **Hediye Bebek Çikolatası** has no products or photo on the live store; its tile uses a brand illustration.
- **Newsletter** posts to the live store's Shopify customer form (`/contact`).
- **Hero images** are 1920×600 originals, so very large screens upscale them slightly. Higher-resolution sources would help.
- **Currency** (TRY) is shown as a label only, with no switcher.
- **Linked pages are Turkish**: product, collection and policy links open the live Turkish store.
