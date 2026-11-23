import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { getContent } from "@/lib/data";

export function Stores({ lang }) {
  const { contact, ui } = getContent(lang);
  return (
    <section aria-labelledby="magazalar-baslik" className="section-y bg-wc">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="magazalar-baslik"
            title={ui.stores.title}
            intro={ui.stores.intro}
          />
          <a href={contact.storesHref} className="ui-label link-underline tap-target shrink-0 self-start text-[0.9375rem] md:self-auto">
            {ui.stores.all}
          </a>
        </div>

        <RevealGroup
          as="ul"
          className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {contact.stores.map((s) => (
            <RevealItem as="li" key={s.name} className="group flex w-[80%] shrink-0 snap-start flex-col sm:w-auto">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-ink">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </div>
              <h3 className="mt-6 font-display text-[1.75rem] leading-tight">{s.name}</h3>
              <address className="mt-3 grid gap-2.5 not-italic text-ink/75">
                <span className="flex gap-2.5">
                  <MapPin className="mt-1 size-4 shrink-0 text-caramel" strokeWidth={1.5} aria-hidden="true" />
                  {s.address}
                </span>
                <span className="flex gap-2.5 italic">
                  <Clock className="mt-1 size-4 shrink-0 text-caramel" strokeWidth={1.5} aria-hidden="true" />
                  {s.hours}
                </span>
                <a href={s.phoneHref} className="tap-target flex gap-2.5 self-start tabular-nums transition-colors hover:text-ink">
                  <Phone className="mt-1 size-4 shrink-0 text-caramel" strokeWidth={1.5} aria-hidden="true" />
                  {s.phone}
                </a>
              </address>
              <a
                href={s.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-label link-underline tap-target mt-5 self-start text-[0.875rem]"
              >
                {ui.stores.map}
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
