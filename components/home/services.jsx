import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FeatureIcon } from "@/components/site/icons";
import { getContent } from "@/lib/data";

/** Icon-box grid. Includes the live site's "The Sweetest Gift" and "Visit Our Stores" blocks. */
export function Services({ lang }) {
  const { features, ui } = getContent(lang);
  return (
    <section aria-label={ui.a11y.services} className="border-y border-ink/10 bg-wc-soft py-[clamp(3.5rem,7vw,6rem)]">
      <RevealGroup as="ul" className="container-x grid gap-x-10 gap-y-10 md:grid-cols-3">
        {features.services.map((s) => (
          <RevealItem as="li" key={s.title} className="group flex gap-5">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-[2px] bg-caramel text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-caramel">
              <FeatureIcon name={s.icon} className="size-6" strokeWidth={1.4} />
            </span>
            <div>
              <h3 className="font-arima text-xl font-normal leading-snug tracking-normal">{s.title}</h3>
              <p className="mt-1.5 max-w-[34ch] text-ink/70">{s.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
