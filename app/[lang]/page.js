import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/home/hero";
import { MarqueeBar } from "@/components/home/marquee-bar";
import { NewYearCollection } from "@/components/home/new-year-collection";
import { GrandTablette } from "@/components/home/grand-tablette";
import { StorySection } from "@/components/home/story-section";
import { BeanToBar } from "@/components/home/bean-to-bar";
import { KakaoPodBanner } from "@/components/home/kakao-pod-banner";
import { Categories } from "@/components/home/categories";
import { BrandQuotes } from "@/components/home/brand-quotes";
import { Services } from "@/components/home/services";
import { Stores } from "@/components/home/stores";
import { CorporateNewsletter } from "@/components/home/corporate-newsletter";
import { hasLocale } from "@/lib/data";

/**
 * Home page (/en, /tr). Sections follow the live haremchocolate.com order
 * (hero → New Year → Grand Tablette → Bean to Bar → Cacao Pod →
 * Our Chocolates → gift & stores → footer), with the new marquee,
 * story, quote and corporate/newsletter sections woven in.
 * All content comes from lib/data.js via getContent(lang).
 */
export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <SiteHeader lang={lang} />
      <main id="icerik">
        <Hero lang={lang} />
        <MarqueeBar lang={lang} />
        <NewYearCollection lang={lang} />
        <GrandTablette lang={lang} />
        <StorySection lang={lang} />
        <BeanToBar lang={lang} />
        <KakaoPodBanner lang={lang} />
        <Categories lang={lang} />
        <BrandQuotes lang={lang} />
        <Services lang={lang} />
        <Stores lang={lang} />
        <CorporateNewsletter lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
