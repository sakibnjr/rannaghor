"use client";

import Image from "next/image";
import * as m from "motion/react-m";
import { useCart } from "@/app/_components/cart-context";
import { Icon } from "@/app/_ui/icon";
import type { OfferCampaign } from "../_types/offer";

export function OfferCard({ offer }: { offer: OfferCampaign }) {
  const { addToCart } = useCart();
  const saving = offer.originalPrice - offer.discountedPrice;

  function addOffer() {
    addToCart({
      id: offer.id,
      name: offer.title,
      slug: offer.id,
      description: offer.subtitle,
      image: offer.image,
      price: offer.discountedPrice,
      oldPrice: offer.originalPrice,
      rating: 4.8,
      reviewCount: 180,
      categoryId: "offers",
      available: true,
    });
  }

  return (
    <m.article
      whileHover={{ y: -4 }}
      className={`group h-full overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-surface shadow-2xs transition-shadow duration-300 hover:shadow-md ${offer.featured ? "lg:grid lg:grid-cols-[1.15fr_0.85fr]" : "flex flex-col"}`}
    >
      <div className={`relative overflow-hidden bg-stone-100 ${offer.featured ? "h-32 xs:h-36 sm:h-44 lg:h-auto lg:min-h-[280px]" : "h-28 xs:h-32 sm:h-40"}`}>
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes={offer.featured ? "(max-width: 767px) 100vw, 66vw" : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 400px"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white shadow-sm sm:left-3 sm:top-3 sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-[11px]">
          {offer.label}
        </div>
        <m.div
          initial={{ scale: 0.8, rotate: -3 }}
          whileInView={{ scale: 1, rotate: 3 }}
          viewport={{ once: true }}
          className={`absolute right-2 top-2 flex flex-col items-center justify-center bg-secondary text-center text-white shadow-md [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)] size-9.5 sm:size-12 sm:right-3 sm:top-3 ${offer.featured ? "lg:size-14" : ""}`}
        >
          <span className="text-[8px] sm:text-[10px] font-semibold leading-none">SAVE</span>
          <strong className="mt-0.5 text-xs sm:text-sm leading-none">৳{saving}</strong>
        </m.div>
      </div>

      <div className={`flex flex-1 flex-col ${offer.featured ? "p-3 sm:p-4 lg:justify-center lg:px-6" : "p-2.5 sm:p-3"}`}>
        <div className="flex items-center font-semibold text-secondary gap-1.5 text-[10px] sm:text-xs">
          <Icon name="clock" className="size-3 sm:size-3.5" />
          <span>{offer.availability}</span>
        </div>
        <h2 className={`${offer.featured ? "mt-1 text-base sm:text-xl" : "mt-0.5 text-sm sm:text-lg"} font-extrabold tracking-tight text-dark group-hover:text-primary leading-snug`}>{offer.title}</h2>
        <p className="mt-0.5 line-clamp-1 sm:line-clamp-2 text-[11px] sm:text-xs leading-tight sm:leading-4 text-muted">{offer.description}</p>

        {offer.items && (
          <ul className="mt-1.5 gap-1 pt-1.5 text-[11px] sm:text-xs grid border-t border-border text-dark sm:grid-cols-2">
            {offer.items.slice(0, 2).map((item) => (
              <li key={item} className="flex items-start gap-1">
                <Icon name="check" className="size-3 mt-0.5 text-secondary shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2 sm:pt-3 border-t border-border/50">
          <div>
            <p className="text-[10px] sm:text-xs font-medium text-muted line-through">৳{offer.originalPrice.toLocaleString()}</p>
            <p className={`${offer.featured ? "text-base sm:text-2xl" : "text-sm sm:text-lg"} font-black text-dark leading-none`}>৳{offer.discountedPrice.toLocaleString()}</p>
          </div>
          <m.button
            type="button"
            onClick={addOffer}
            whileTap={{ scale: 0.94 }}
            className={`inline-flex items-center rounded-lg sm:rounded-xl bg-primary font-bold text-white shadow-2xs transition-colors hover:bg-primary-hover min-h-8 gap-1 px-2.5 text-[11px] sm:min-h-9 sm:gap-1.5 sm:px-3 sm:text-xs`}
          >
            <Icon name="cart" className="size-3.5" /> Add deal
          </m.button>
        </div>
      </div>
    </m.article>
  );
}
