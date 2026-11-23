import Image from "next/image";
import Link from "next/link";
import { LOCALES, brand, getContent } from "@/lib/data";

/** 404 for unknown paths; the language is unknown here, so both are shown. */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-14 bg-wc px-6 py-20 text-center text-ink">
      <Image src={brand.logos.emblemGold} alt="Harem Chocolate" width={498} height={499} className="size-20" />
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        {LOCALES.map((lang) => {
          const { ui } = getContent(lang);
          return (
            <div key={lang} lang={lang} className="max-w-sm">
              <h1 className="display-lg">{ui.notFound.title}</h1>
              <p className="mt-4 italic text-ink/70">{ui.notFound.text}</p>
              <Link href={`/${lang}`} className="ui-label link-underline mt-6 inline-block text-[0.9375rem]">
                {ui.notFound.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
