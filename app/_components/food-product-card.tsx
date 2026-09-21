"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice } from "@/app/_lib/cart-calculations";
import type { Product } from "@/app/_types/product";
import { Badge } from "@/app/_ui/badge";
import { Icon } from "@/app/_ui/icon";
import { BestsellerSvgBadge, SavingsSvgBadge } from "@/app/_ui/product-svg-badges";
import { RatingStars } from "@/app/_ui/rating-stars";

export function FoodProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saving = product.oldPrice ? product.oldPrice - product.price : 0;

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  function addProduct() {
    addToCart(product);
    setAdded(true);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setAdded(false), 1100);
  }

  return (
    <m.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group flex h-full flex-col overflow-hidden border border-border bg-surface shadow-2xs transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md ${compact ? "rounded-xl" : "rounded-2xl"}`}
    >
      <div className={`relative overflow-hidden bg-stone-100 ${compact ? "aspect-video" : "aspect-[16/11]"}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 320px"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.available ? "" : "grayscale"}`}
        />

        <div className={`absolute z-10 flex flex-wrap ${compact ? "left-2 top-2 gap-1" : "left-3 top-3 gap-2"}`}>
          {product.bestseller && <BestsellerSvgBadge />}
          {product.oldPrice && <SavingsSvgBadge amount={formatPrice(saving)} />}
          {!!product.spicyLevel && <Badge variant="neutral" className="border border-red-200 bg-red-50 text-red-700">Spicy</Badge>}
        </div>

        {!product.available && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-dark/55">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-dark">Sold out today</span>
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-3" : "p-4"}`}>
        <h3 className={`${compact ? "line-clamp-1 min-h-5 text-[15px]" : "line-clamp-2 min-h-10 text-lg"} font-extrabold leading-snug tracking-tight text-dark transition-colors group-hover:text-primary`}>
          {product.name}
        </h3>
        <p className={`${compact ? "mt-0.5 line-clamp-1 min-h-4 text-xs leading-4" : "mt-1 line-clamp-2 min-h-10 text-sm leading-5"} text-muted`}>
          {product.description}
        </p>

        <RatingStars
          score={product.rating}
          count={product.reviewCount}
          className={compact ? "mt-1.5" : "mt-2.5"}
        />

        <div className={`${compact ? "mt-2 gap-2 pt-2" : "mt-3 gap-3 pt-3"} flex items-end justify-between border-t border-border`}>
          <div className="min-w-0">
            <p className={`${compact ? "text-[9px]" : "text-[11px]"} font-semibold uppercase tracking-wide text-muted`}>
              {product.oldPrice ? "Offer price" : "Price"}
            </p>
            <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
              <strong className={`${compact ? "text-base" : "text-lg"} font-black text-dark`}>{formatPrice(product.price)}</strong>
              {product.oldPrice && (
                <span className={`${compact ? "text-xs" : "text-sm"} font-medium text-muted line-through decoration-2`}>
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
          </div>

          <m.button
            type="button"
            disabled={!product.available}
            onClick={addProduct}
            whileTap={product.available ? { scale: 0.92 } : undefined}
            animate={added ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            aria-label={product.available ? `Add ${product.name} to cart for ${formatPrice(product.price)}` : `${product.name} is unavailable`}
            className={`inline-flex shrink-0 items-center rounded-xl font-bold text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:bg-stone-300 ${compact ? "min-h-9 gap-1.5 px-2.5 text-xs" : "min-h-10 gap-2 px-3.5 text-sm"} ${added ? "bg-secondary" : "bg-primary hover:bg-primary-hover"}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={added ? "added" : "default"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="inline-flex items-center gap-2"
              >
                <Icon name={added ? "check" : product.available ? "plus" : "minus"} className="size-4" />
                <span>{added ? "Added" : product.available ? "Add" : "Unavailable"}</span>
              </m.span>
            </AnimatePresence>
          </m.button>
        </div>
      </div>
    </m.article>
  );
}
