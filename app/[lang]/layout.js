import { Forum, EB_Garamond, Arima, Josefin_Sans, Mrs_Saint_Delafield } from "next/font/google";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Preloader } from "@/components/site/preloader";
import { preloaderBootScript } from "@/components/site/preloader-boot";
import { DEFAULT_LOCALE, LOCALES, SITE_URL, getContent, hasLocale, localeMeta } from "@/lib/data";
import "../globals.css";

// Algiers stand-in (display)
const forum = Forum({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-forum", display: "swap" });
// Garamond (brand)
const garamond = EB_Garamond({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-garamond", display: "swap" });
// Arima Madurai (brand, OFL) — published on Google Fonts as "Arima"; guide: "use light version for details" (300)
const arima = Arima({ subsets: ["latin", "latin-ext"], variable: "--font-arima-madurai", display: "swap" });
// Neutraface Text / Chap Light stand-in (UI)
const josefin = Josefin_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-josefin", display: "swap" });
// Starlit Drive stand-in (script, never all caps)
const delafield = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-delafield", display: "swap" });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { seo } = getContent(lang);
  const locale = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])), "x-default": `/${DEFAULT_LOCALE}` },
    },
    icons: { icon: "/assets/brand/icon-512.png", apple: "/assets/brand/icon-512.png" },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      siteName: "Harem Chocolate",
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.ogImage, width: 1920, height: 600, alt: seo.ogImageAlt }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [seo.ogImage] },
  };
}

export const viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const { ui } = getContent(lang);
  const locale = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${forum.variable} ${garamond.variable} ${arima.variable} ${josefin.variable} ${delafield.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* decides before first paint whether the preloader shows (see preloader-boot.js) */}
        <script dangerouslySetInnerHTML={{ __html: preloaderBootScript }} />
      </head>
      <body>
        <a
          href="#icerik"
          className="ui-label sr-only fixed left-4 top-4 z-[100] bg-ink px-4 py-3 text-wc focus:not-sr-only"
        >
          {ui.skipLink}
        </a>
        <SmoothScroll>
          <Preloader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
