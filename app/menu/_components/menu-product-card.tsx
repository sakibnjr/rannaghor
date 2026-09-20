"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/app/_types/product";
import { useCart } from "@/app/_components/cart-context";
import { RatingStars } from "@/app/_ui/rating-stars";
import { Icon } from "@/app/_ui/icon";

export function MenuProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [favourite, setFavourite] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 300px"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.available ? "" : "grayscale"}`}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.bestseller && <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">Bestseller</span>}
          {product.oldPrice && <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white shadow-sm">Save ৳{product.oldPrice - product.price}</span>}
          {!!product.spicyLevel && <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white shadow-sm">Spicy</span>}
        </div>
        <button
          type="button"
          aria-label={`${favourite ? "Remove" : "Add"} ${product.name} ${favourite ? "from" : "to"} favourites`}
          aria-pressed={favourite}
          onClick={() => setFavourite((value) => !value)}
          className={`absolute right-3 top-3 flex size-11 items-center justify-center rounded-full shadow-sm transition-colors ${
            favourite ? "bg-primary text-white" : "bg-white/95 text-dark hover:text-primary"
          }`}
        >
          <Icon name="heart" className="size-5" />
        </button>
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark/55">
            <span className="rounded-full bg-surface px-4 py-2 text-sm font-bold text-dark">Sold out today</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold leading-snug text-dark group-hover:text-primary">{product.name}</h2>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{product.description}</p>
          </div>
        </div>
        <div className="mt-3"><RatingStars score={product.rating} count={product.reviewCount} /></div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{product.oldPrice ? "Offer price" : "Price"}</p>
            <div className="mt-0.5 flex items-baseline gap-2">
              <p className="text-xl font-extrabold text-dark">৳{product.price}</p>
              {product.oldPrice && <p className="text-sm font-medium text-muted line-through decoration-2">৳{product.oldPrice}</p>}
            </div>
          </div>
          <button
            type="button"
            disabled={!product.available}
            onClick={() => addToCart(product)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            <Icon name={product.available ? "plus" : "minus"} className="size-4" />
            {product.available ? "Add" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
