import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { getContent } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Categories({ lang }) {
  const { categories, ui } = getContent(lang);
  return (
    <section aria-labelledby="cesitler-baslik" className="section-y bg-wc">
      <div className="container-x">
        <SectionHeading id="cesitler-baslik" title={categories.title} align="center" />
        <RevealGroup as="ul" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {categories.items.map((c, i) => (
            <RevealItem as="li" key={c.name} className={cn(i === 4 && "col-span-2 md:col-span-1")}>
              <a href={c.href} className="group flex flex-col items-center text-center">
                <div className="relative aspect-square w-full max-w-[15rem]">
                  {/* ring draws in on hover */}
                  <svg className="absolute -inset-[5%] size-[110%] -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                    <circle
                      cx="50"
                      cy="50"
                      r="49"
                      fill="none"
                      stroke="#BC7D1E"
                      strokeWidth="0.6"
                      pathLength="1"
                      strokeDasharray="1"
                      className="opacity-0 [stroke-dashoffset:1] transition-[stroke-dashoffset,opacity] duration-1000 group-hover:opacity-100 group-focus-visible:opacity-100 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
                    />
                  </svg>
                  <div className="absolute inset-0 overflow-hidden rounded-full bg-wc-soft">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 15vw, 40vw"
                      className={cn(
                        "object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:scale-105",
                        c.illustration ? "p-[16%]" : "p-[12%]",
                      )}
                    />
                  </div>
                </div>
                <h3 className="mt-6 font-arima text-lg font-light leading-snug tracking-normal">{c.name}</h3>
                <p className="mt-1 italic text-ink/60">{c.count ? ui.product.countLabel(c.count) : ui.product.emptyCollection}</p>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
