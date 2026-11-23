import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";
import { getContent } from "@/lib/data";

export function CorporateNewsletter({ lang }) {
  const { contact, ui } = getContent(lang);
  const { corporate, newsletter } = contact;
  return (
    <section aria-label={ui.a11y.corporateNewsletter} className="grid bg-ink text-wc lg:grid-cols-2">
      {/* Corporate orders */}
      <div className="px-[clamp(1.25rem,5vw,5rem)] py-20 md:py-28">
        <Reveal className="max-w-xl">
          <h2 className="display-md text-wc">{corporate.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-wc/75">{corporate.text}</p>
          <ol className="mt-10 grid gap-4">
            {corporate.steps.map((step, n) => (
              <li key={step} className="flex items-baseline gap-5 border-b border-wc/15 pb-4">
                <span className="font-display text-2xl text-caramel">{n + 1}</span>
                <span className="font-arima text-lg font-light">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <CtaLink href={corporate.cta.href} variant="caramel">
              {corporate.cta.label}
            </CtaLink>
            <div className="ui-label grid gap-1.5 text-[0.875rem] text-wc/70">
              <a href={contact.phoneHref} className="tap-target self-start tabular-nums hover:text-caramel">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="tap-target self-start hover:text-caramel">{contact.email}</a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Newsletter — posts to the live store's Shopify customer form */}
      <div className="relative isolate flex items-center overflow-hidden px-[clamp(1.25rem,5vw,5rem)] py-20 md:py-28">
        <Image
          src="/assets/images/cocoa-powder.jpg"
          alt=""
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/55" />
        <Reveal className="w-full max-w-lg">
          <h2 className="display-md">{newsletter.title}</h2>
          <p className="mt-5 text-lg text-wc/85">{newsletter.text}</p>
          <form action={newsletter.action} method="post" acceptCharset="UTF-8" className="mt-9">
            <input type="hidden" name="form_type" value="customer" />
            <input type="hidden" name="utf8" value="✓" />
            <input type="hidden" name="contact[tags]" value="newsletter" />
            <label htmlFor="newsletter-email" className="sr-only">
              {newsletter.placeholder}
            </label>
            <div className="flex flex-col gap-3 border-b border-wc/50 pb-3 transition-colors focus-within:border-caramel sm:flex-row sm:items-center">
              <input
                id="newsletter-email"
                type="email"
                name="contact[email]"
                required
                autoComplete="email"
                spellCheck={false}
                placeholder={newsletter.placeholder}
                className="h-12 w-full min-w-0 bg-transparent text-lg text-wc placeholder:text-wc/60 focus:outline-none sm:flex-1"
              />
              <button
                type="submit"
                className="ui-label h-12 shrink-0 rounded-[2px] bg-wc px-7 text-[0.9375rem] text-ink transition-colors duration-300 hover:bg-caramel"
              >
                {newsletter.button}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
