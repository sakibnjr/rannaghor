"use client";

import Image from "next/image";
import Link from "next/link";
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
      <div className={`relative overflow-hidden bg-stone-100 ${compact ? "aspect-[4/3] sm:aspect-video" : "aspect-[16/11]"}`}>
        <Link href={`/menu/${product.slug}`} aria-label={`View details for ${product.name}`} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 320px"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.available ? "" : "grayscale"}`}
          />
        </Link>

        <div className={`absolute z-10 flex flex-wrap ${compact ? "left-1.5 top-1.5 gap-1 scale-90 origin-top-left sm:scale-100 sm:left-2 sm:top-2" : "left-2 top-2 sm:left-3 sm:top-3 gap-1.5 sm:gap-2"}`}>
          {product.bestseller && <BestsellerSvgBadge />}
          {product.oldPrice && <SavingsSvgBadge amount={formatPrice(saving)} />}
          {!!product.spicyLevel && <Badge variant="neutral" className="border border-red-200 bg-red-50 text-[10px] text-red-700 sm:text-xs">Spicy</Badge>}
        </div>

        {!product.available && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-dark/55">
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-dark sm:px-4 sm:py-2 sm:text-sm">Sold out</span>
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-2.5 sm:p-3" : "p-2.5 sm:p-4"}`}>
        <h3 className={`${compact ? "line-clamp-1 text-xs sm:text-[15px]" : "line-clamp-1 sm:line-clamp-2 text-xs sm:text-base lg:text-lg"} font-extrabold leading-tight tracking-tight text-dark transition-colors group-hover:text-primary`}>
          <Link href={`/menu/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className={`${compact ? "mt-0.5 line-clamp-1 text-[11px] leading-tight text-muted sm:text-xs sm:leading-4" : "mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2 text-[11px] leading-tight text-muted sm:text-sm sm:leading-5"}`}>
          {product.description}
        </p>

        <RatingStars
          score={product.rating}
          count={product.reviewCount}
          className={compact ? "mt-1 sm:mt-1.5" : "mt-1 sm:mt-2.5"}
        />

        <div className={`${compact ? "mt-1.5 gap-1.5 pt-1.5 sm:mt-2 sm:gap-2 sm:pt-2" : "mt-1.5 gap-1.5 pt-1.5 sm:mt-2 sm:gap-2 sm:pt-2"} flex items-center justify-between border-t border-border`}>
          <div className="min-w-0">
            <p className="hidden sm:block text-[9px] font-semibold uppercase tracking-wide text-muted sm:text-[11px]">
              {product.oldPrice ? "Offer price" : "Price"}
            </p>
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <strong className="text-xs font-black text-dark sm:text-base lg:text-lg">{formatPrice(product.price)}</strong>
              {product.oldPrice && (
                <span className="text-[10px] font-medium text-muted line-through decoration-1 sm:text-xs lg:text-sm sm:decoration-2">
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
            className={`inline-flex shrink-0 items-center justify-center rounded-lg sm:rounded-xl font-bold text-white shadow-2xs transition-colors disabled:cursor-not-allowed disabled:bg-stone-300 min-h-7 px-2 text-[11px] sm:min-h-9 sm:px-2.5 sm:text-xs ${added ? "bg-secondary" : "bg-primary hover:bg-primary-hover"}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={added ? "added" : "default"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="inline-flex items-center gap-1 sm:gap-1.5"
              >
                <Icon name={added ? "check" : product.available ? "plus" : "minus"} className="size-3.5 sm:size-4" />
                <span className="hidden xs:inline sm:inline">{added ? "Added" : product.available ? "Add" : "Out"}</span>
              </m.span>
            </AnimatePresence>
          </m.button>
        </div>
      </div>
    </m.article>
  );
}
