"use client";

import Image from "next/image";
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
    <article className={`group overflow-hidden rounded-3xl border border-border bg-surface shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${offer.featured ? "md:col-span-2 lg:grid lg:grid-cols-[1.15fr_0.85fr] xl:col-span-3" : "flex flex-col"}`}>
      <div className={`relative overflow-hidden bg-stone-100 ${offer.featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[360px]" : "aspect-[16/10]"}`}>
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes={offer.featured ? "(max-width: 767px) 100vw, 66vw" : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 400px"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-sm">
          {offer.label}
        </div>
        <div className="absolute right-4 top-4 flex size-16 rotate-3 flex-col items-center justify-center bg-secondary text-center text-white shadow-md [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]">
          <span className="text-[10px] font-semibold leading-none">SAVE</span>
          <strong className="mt-1 text-sm leading-none">৳{saving}</strong>
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${offer.featured ? "lg:justify-center lg:px-8" : ""}`}>
        <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
          <Icon name="clock" className="size-4" />
          <span>{offer.availability}</span>
        </div>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-dark group-hover:text-primary">{offer.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{offer.description}</p>

        {offer.items && (
          <ul className="mt-4 grid gap-2 border-t border-border pt-4 text-sm text-dark sm:grid-cols-2">
            {offer.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 size-3.5 text-secondary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={`flex items-end justify-between gap-4 pt-5 ${offer.featured ? "mt-1" : "mt-auto"}`}>
          <div>
            <p className="text-xs font-medium text-muted line-through">৳{offer.originalPrice.toLocaleString()}</p>
            <p className="text-2xl font-black text-dark">৳{offer.discountedPrice.toLocaleString()}</p>
          </div>
          <button
            type="button"
            onClick={addOffer}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            <Icon name="cart" className="size-4" /> Add deal
          </button>
        </div>
      </div>
    </article>
  );
}
