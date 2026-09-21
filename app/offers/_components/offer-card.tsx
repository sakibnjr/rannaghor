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
      className={`group h-full overflow-hidden rounded-2xl border border-border bg-surface shadow-2xs transition-shadow duration-300 hover:shadow-md ${offer.featured ? "lg:grid lg:grid-cols-[1.15fr_0.85fr]" : "flex flex-col"}`}
    >
      <div className={`relative overflow-hidden bg-stone-100 ${offer.featured ? "aspect-video lg:aspect-auto lg:min-h-[300px]" : "h-36 sm:h-40"}`}>
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes={offer.featured ? "(max-width: 767px) 100vw, 66vw" : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 400px"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-lg bg-primary px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
          {offer.label}
        </div>
        <m.div
          initial={{ scale: 0.8, rotate: -3 }}
          whileInView={{ scale: 1, rotate: 3 }}
          viewport={{ once: true }}
          className={`absolute right-3 top-3 flex flex-col items-center justify-center bg-secondary text-center text-white shadow-md [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)] ${offer.featured ? "size-14" : "size-12"}`}
        >
          <span className="text-[10px] font-semibold leading-none">SAVE</span>
          <strong className="mt-1 text-sm leading-none">৳{saving}</strong>
        </m.div>
      </div>

      <div className={`flex flex-1 flex-col ${offer.featured ? "p-4 lg:justify-center lg:px-6" : "p-3"}`}>
        <div className={`flex items-center font-semibold text-secondary ${offer.featured ? "gap-2 text-xs" : "gap-1.5 text-[10px]"}`}>
          <Icon name="clock" className={offer.featured ? "size-4" : "size-3"} />
          <span>{offer.availability}</span>
        </div>
        <h2 className={`${offer.featured ? "mt-2 text-xl" : "mt-1.5 text-lg"} font-extrabold tracking-tight text-dark group-hover:text-primary`}>{offer.title}</h2>
        <p className={`${offer.featured ? "mt-1.5 text-sm leading-6" : "mt-1 line-clamp-2 text-xs leading-4"} text-muted`}>{offer.description}</p>

        {offer.items && (
          <ul className={`${offer.featured ? "mt-3 gap-1.5 pt-3 text-sm" : "mt-2 gap-1 pt-2 text-xs"} grid border-t border-border text-dark sm:grid-cols-2`}>
            {offer.items.map((item) => (
              <li key={item} className={`flex items-start ${offer.featured ? "gap-2" : "gap-1.5"}`}>
                <Icon name="check" className={`${offer.featured ? "size-3.5" : "size-3"} mt-0.5 text-secondary`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={`flex items-end justify-between ${offer.featured ? "mt-0.5 gap-3 pt-4" : "mt-auto gap-2 pt-3"}`}>
          <div>
            <p className="text-xs font-medium text-muted line-through">৳{offer.originalPrice.toLocaleString()}</p>
            <p className={`${offer.featured ? "text-2xl" : "text-lg"} font-black text-dark`}>৳{offer.discountedPrice.toLocaleString()}</p>
          </div>
          <m.button
            type="button"
            onClick={addOffer}
            whileTap={{ scale: 0.94 }}
            className={`inline-flex items-center rounded-xl bg-primary font-bold text-white shadow-sm transition-colors hover:bg-primary-hover ${offer.featured ? "min-h-10 gap-1.5 px-4 text-sm" : "min-h-9 gap-1.5 px-3 text-xs"}`}
          >
            <Icon name="cart" className="size-4" /> Add deal
          </m.button>
        </div>
      </div>
    </m.article>
  );
}
