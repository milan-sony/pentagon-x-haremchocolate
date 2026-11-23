import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/site/icons";
import { CurrentYear } from "@/components/site/current-year";
import { getContent } from "@/lib/data";

export function SiteFooter({ lang }) {
  const { brand, contact, footer, ui } = getContent(lang);
  return (
    <footer className="relative overflow-hidden bg-ink text-wc">
      <div className="container-x grid gap-14 pb-14 pt-20 md:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href={`/${lang}`} aria-label={ui.a11y.home} className="relative block w-[200px]" style={{ aspectRatio: "1366 / 410" }}>
            <Image src={brand.logos.primaryLight} alt="Harem Chocolate" fill sizes="200px" className="object-contain" />
          </Link>
          <p className="mt-6 italic text-wc/65">{footer.tagline}</p>
          <div className="ui-label mt-8 grid gap-2 text-[0.9375rem] text-wc/80">
            <a href={`mailto:${contact.email}`} className="tap-target self-start hover:text-caramel">{contact.email}</a>
            <a href={contact.phoneHref} className="tap-target self-start tabular-nums hover:text-caramel">{contact.phone}</a>
          </div>
          <ul className="mt-8 flex gap-2" aria-label={ui.a11y.social}>
            {footer.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-wc/25 text-wc/80 transition-colors hover:border-caramel hover:bg-caramel hover:text-ink"
                >
                  <Icon name={s.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={ui.a11y.footerNav} className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h2 className="font-display text-2xl text-wc">{col.title}</h2>
              <ul className="mt-4 grid">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="inline-block min-w-11 py-2.5 text-[0.975rem] leading-snug text-wc/70 transition-colors hover:text-caramel">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-wc/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="ui-label text-[0.8125rem] text-wc/70">
            © <CurrentYear /> {footer.copyright}
          </p>
          <Image src={brand.logos.emblemGold} alt="" width={498} height={499} className="size-9 opacity-90" />
        </div>
      </div>
    </footer>
  );
}
