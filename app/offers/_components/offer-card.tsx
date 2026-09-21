"use client";

import Image from "next/image";
import Link from "next/link";
import * as m from "motion/react-m";
import { useCart } from "@/app/_components/cart-context";
import { Icon } from "@/app/_ui/icon";
import { getOfferSlug } from "../_data/offer-campaigns";
import type { OfferCampaign } from "../_types/offer";

export function OfferCard({ offer }: { offer: OfferCampaign }) {
  const { addToCart } = useCart();
  const slug = getOfferSlug(offer);
  const saving = offer.originalPrice - offer.discountedPrice;

  function addOffer() {
    addToCart({
      id: offer.id,
      name: offer.title,
      slug: slug,
      description: offer.subtitle,
      image: offer.image,
      price: offer.discountedPrice,
      oldPrice: offer.originalPrice,
      rating: offer.rating ?? 4.8,
      reviewCount: offer.reviewCount ?? 180,
      categoryId: "offers",
      available: true,
    });
  }

  return (
    <m.article
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-surface shadow-2xs transition-shadow duration-300 hover:shadow-md"
    >
      <Link
        href={`/offers/${slug}`}
        className="relative block h-28 xs:h-32 sm:h-40 lg:h-40 xl:h-44 w-full overflow-hidden bg-stone-100 focus:outline-hidden"
        aria-label={`View details for ${offer.title}`}
      >
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-1.5 top-1.5 sm:left-2.5 sm:top-2.5 rounded-md sm:rounded-lg bg-primary px-1.5 sm:px-2 py-0.2 sm:py-0.5 text-[9px] sm:text-[11px] font-bold text-white shadow-xs">
          {offer.label}
        </div>
        <m.div
          initial={{ scale: 0.8, rotate: -3 }}
          whileInView={{ scale: 1, rotate: 3 }}
          viewport={{ once: true }}
          className="absolute right-1.5 top-1.5 sm:right-2.5 sm:top-2.5 flex size-8 sm:size-11 flex-col items-center justify-center bg-secondary text-center text-white shadow-sm sm:shadow-md [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]"
        >
          <span className="text-[6px] sm:text-[8px] font-semibold leading-none">SAVE</span>
          <strong className="mt-0.2 text-[8px] sm:text-[11px] font-bold leading-none">৳{saving}</strong>
        </m.div>
      </Link>

      <div className="flex flex-1 flex-col p-2 sm:p-3.5">
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-secondary">
          <Icon name="clock" className="size-2.5 sm:size-3 shrink-0" />
          <span className="truncate">{offer.availability}</span>
        </div>

        <h2 className="mt-0.5 sm:mt-1 line-clamp-1 text-xs sm:text-base font-extrabold tracking-tight text-dark transition-colors group-hover:text-primary leading-snug">
          <Link href={`/offers/${slug}`} className="hover:underline focus:outline-hidden">
            {offer.title}
          </Link>
        </h2>

        <p className="mt-0.5 line-clamp-1 sm:line-clamp-2 text-[10px] sm:text-xs leading-relaxed text-muted">
          {offer.description}
        </p>

        {offer.items && (
          <ul className="mt-1.5 hidden sm:grid grid-cols-1 gap-1 border-t border-border pt-1.5 text-[11px] text-dark">
            {offer.items.slice(0, 3).map((item) => (
              <li key={item} className="flex items-center gap-1">
                <Icon name="check" className="size-3 text-secondary shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-1 sm:gap-2 border-t border-border/60 pt-1.5 sm:pt-2.5">
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] font-medium text-muted line-through truncate">
              ৳{offer.originalPrice.toLocaleString()}
            </p>
            <p className="text-xs sm:text-base font-black text-dark leading-none truncate">
              ৳{offer.discountedPrice.toLocaleString()}
            </p>
          </div>
          <m.button
            type="button"
            onClick={addOffer}
            whileTap={{ scale: 0.94 }}
            className="inline-flex shrink-0 min-h-7 sm:min-h-8.5 items-center gap-1 rounded-lg sm:rounded-xl bg-primary px-2 sm:px-2.5 text-[10px] sm:text-xs font-bold text-white shadow-2xs transition-colors hover:bg-primary-hover cursor-pointer"
          >
            <Icon name="cart" className="size-3 sm:size-3.5" />
            <span className="hidden xs:inline">Add</span>
          </m.button>
        </div>
      </div>
    </m.article>
  );
}
