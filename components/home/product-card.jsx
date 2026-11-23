import Image from "next/image";
import { formatPrice, getContent } from "@/lib/data";
import { cn } from "@/lib/utils";

function StatusBadge({ product, ui }) {
  if (product.soldOut)
    return <span className="ui-label rounded-[2px] bg-ink px-2.5 py-1.5 text-[0.75rem] text-wc">{ui.product.soldOut}</span>;
  if (product.stock)
    return (
      <span className="ui-label rounded-[2px] bg-caramel px-2.5 py-1.5 text-[0.75rem] text-ink">{ui.product.lowStock(product.stock)}</span>
    );
  return null;
}

/**
 * Light product card (New Year collection). The second photo crossfades in
 * on hover; a "view product" bar slides up from the bottom.
 */
export function ProductCard({ product, lang, sizes = "(min-width:1024px) 25vw, (min-width:640px) 40vw, 80vw" }) {
  const { ui } = getContent(lang);
  return (
    <article className="group relative flex h-full flex-col">
      <a href={product.href} className="flex h-full flex-col focus-visible:outline-offset-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-wc-soft">
          <Image
            src={product.image}
            alt={`${product.name}${product.variant ? `, ${product.variant}` : ""}`}
            fill
            sizes={sizes}
            className={cn(
              "object-contain p-[9%] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
              product.hoverImage && "group-hover:opacity-0",
              product.soldOut && "grayscale-[0.6]",
            )}
          />
          {product.hoverImage ? (
            <Image
              src={product.hoverImage}
              alt=""
              fill
              sizes={sizes}
              className="scale-[1.06] object-contain p-[9%] opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
            />
          ) : null}
          <div className="absolute left-3 top-3 flex gap-1.5">
            <StatusBadge product={product} ui={ui} />
          </div>
          <span aria-hidden="true" className="ui-label absolute inset-x-3 bottom-3 flex h-11 translate-y-[140%] items-center justify-center rounded-[2px] bg-ink text-[0.875rem] text-wc transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
            {product.soldOut ? ui.product.view : ui.product.viewAndAdd}
          </span>
        </div>
        <div className="flex flex-1 flex-col pt-5">
          <h3 className="font-arima text-lg font-normal leading-snug tracking-normal">{product.name}</h3>
          {product.variant ? <p className="mt-0.5 italic leading-snug text-ink/65">{product.variant}</p> : null}
          <p className="ui-label mt-auto pt-3 text-[0.9375rem] tabular-nums text-ink/85">{formatPrice(product.price, lang)}</p>
        </div>
      </a>
    </article>
  );
}
