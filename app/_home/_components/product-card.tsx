"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/app/_types/product";
import { Badge } from "@/app/_ui/badge";
import { RatingStars } from "@/app/_ui/rating-stars";
import { Icon } from "@/app/_ui/icon";
import { useCart } from "@/app/_components/cart-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [favourite, setFavourite] = useState(false);
  const saving = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          {product.bestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {product.oldPrice && <Badge variant="success">Save ৳{saving}</Badge>}
        </div>
        <button
          type="button"
          aria-label={`${favourite ? "Remove" : "Add"} ${product.name} ${favourite ? "from" : "to"} favourites`}
          aria-pressed={favourite}
          onClick={() => setFavourite((value) => !value)}
          className={`absolute right-3 top-3 z-10 flex size-11 items-center justify-center rounded-full shadow-sm transition-all ${favourite ? "bg-primary text-white" : "bg-white/95 text-dark hover:text-primary"}`}
        >
          <Icon name="heart" className="size-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div>
          <h3 className="text-lg font-extrabold leading-snug tracking-tight text-dark transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
            {product.description}
          </p>
        </div>

        <div className="mt-3">
          <RatingStars score={product.rating} count={product.reviewCount} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              {product.oldPrice ? "Offer price" : "Price"}
            </p>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="text-xl font-black text-dark">৳{product.price}</span>
              {product.oldPrice && (
                <span className="text-sm font-medium text-muted line-through decoration-2">৳{product.oldPrice}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart for ৳${product.price}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-hover active:scale-95"
          >
            <Icon name="plus" className="size-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
