"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/app/_components/cart-context";
import { FoodProductCard } from "@/app/_components/food-product-card";
import { formatPrice } from "@/app/_lib/cart-calculations";
import type { Product, ProductAddOn } from "@/app/_types/product";
import { Badge } from "@/app/_ui/badge";
import { Icon } from "@/app/_ui/icon";
import { RatingStars } from "@/app/_ui/rating-stars";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { addToCart, openCart } = useCart();
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant = product.variants?.find((variant) => variant.id === variantId);
  const addOns = useMemo(
    () => product.addOns?.filter((addOn) => selectedAddOns.includes(addOn.id)) ?? [],
    [product.addOns, selectedAddOns],
  );
  const unitPrice = (selectedVariant?.price ?? product.price) + addOns.reduce((total, item) => total + item.price, 0);
  const totalPrice = unitPrice * quantity;

  function toggleAddOn(addOn: ProductAddOn) {
    setSelectedAddOns((current) =>
      current.includes(addOn.id)
        ? current.filter((id) => id !== addOn.id)
        : [...current, addOn.id],
    );
  }

  function handleAddToCart() {
    addToCart(product, { variant: selectedVariant, addOns, instructions, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <main className="flex-1 pb-24 lg:pb-0">
      <div className="site-shell py-2.5 sm:py-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Icon name="right" className="size-3" />
          <Link href="/menu" className="hover:text-primary">Menu</Link>
          <Icon name="right" className="size-3" />
          <span aria-current="page" className="truncate text-dark">{product.name}</span>
        </nav>
      </div>

      <section className="site-shell pb-7 sm:pb-9" aria-labelledby="product-title">
        <div className="grid overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative h-[180px] overflow-hidden bg-stone-100 xs:h-[210px] sm:h-[260px] md:h-[300px] lg:h-auto lg:min-h-[480px]">
            <Image
              src={product.image}
              alt={`${product.name}, freshly prepared and ready to serve`}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 54vw"
              className={`object-cover ${product.available ? "" : "grayscale"}`}
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 sm:left-4 sm:top-4">
              {product.bestseller && <Badge variant="bestseller">Bestseller</Badge>}
              {savings > 0 && <Badge variant="success">Save {formatPrice(savings)}</Badge>}
              {!!product.spicyLevel && <Badge variant="neutral">🌶 Spicy</Badge>}
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-secondary shadow-md backdrop-blur sm:bottom-4 sm:left-4">
              <span className={`size-2 rounded-full ${product.available ? "bg-emerald-500" : "bg-stone-400"}`} />
              {product.available ? "Available now" : "Currently unavailable"}
            </div>
          </div>

          <div className="flex flex-col p-4 sm:p-5 lg:p-6">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{product.categoryId.replace(/^cat-/, "")}</p>
              <h1 id="product-title" className="mt-1 text-2xl font-black tracking-tight text-dark sm:text-3xl lg:text-4xl lg:leading-tight">
                {product.name}
              </h1>
              <RatingStars score={product.rating} count={product.reviewCount} className="mt-2" />
              <p className="mt-2.5 text-sm leading-6 text-muted sm:text-[15px]">{product.description}</p>
              <div className="mt-3 flex items-end gap-2">
                <strong className="text-2xl font-black text-dark sm:text-3xl">{formatPrice(selectedVariant?.price ?? product.price)}</strong>
                {product.oldPrice && !selectedVariant && <span className="pb-1 text-base font-medium text-muted line-through">{formatPrice(product.oldPrice)}</span>}
              </div>
            </div>

            {product.variants && product.variants.length > 0 && (
              <fieldset className="border-b border-border py-4">
                <legend className="flex w-full items-center justify-between text-sm font-extrabold text-dark sm:text-base">
                  Choose your size <span className="text-xs font-semibold text-primary">Required</span>
                </legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {product.variants.map((variant) => (
                    <label key={variant.id} className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors ${variantId === variant.id ? "border-primary bg-primary-light" : "border-border hover:border-primary/40"}`}>
                      <input type="radio" name="variant" value={variant.id} checked={variantId === variant.id} onChange={() => setVariantId(variant.id)} className="size-4 accent-primary" />
                      <span className="flex flex-1 items-center justify-between gap-2 text-sm">
                        <span className="font-bold text-dark">{variant.name}</span>
                        <span className="font-extrabold text-dark">{formatPrice(variant.price)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {product.addOns && product.addOns.length > 0 && (
              <fieldset className="border-b border-border py-4">
                <legend className="flex w-full items-center justify-between text-sm font-extrabold text-dark sm:text-base">
                  Add something extra <span className="text-xs font-medium text-muted">Optional</span>
                </legend>
                <div className="mt-1.5 space-y-0.5">
                  {product.addOns.map((addOn) => (
                    <label key={addOn.id} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1.5">
                      <input type="checkbox" checked={selectedAddOns.includes(addOn.id)} onChange={() => toggleAddOn(addOn)} className="size-5 rounded accent-primary" />
                      <span className="flex flex-1 items-center justify-between gap-3 text-sm">
                        <span className="font-semibold text-dark">{addOn.name}</span>
                        <span className="font-bold text-muted">+{formatPrice(addOn.price)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="py-4">
              <label htmlFor="instructions" className="text-sm font-extrabold text-dark sm:text-base">Special instructions <span className="text-xs font-medium text-muted">(optional)</span></label>
              <textarea id="instructions" value={instructions} onChange={(event) => setInstructions(event.target.value)} maxLength={160} rows={2} placeholder="Less spicy, no onion…" className="mt-2 w-full resize-none rounded-lg border border-border bg-brand-bg px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
              <p className="mt-1 text-right text-xs text-muted">{instructions.length}/160</p>
            </div>

            <div className="mt-auto hidden items-center gap-2.5 lg:flex">
              <div className="flex h-12 items-center rounded-lg border border-border bg-brand-bg p-0.5" aria-label="Quantity selector">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex size-11 items-center justify-center rounded-md text-dark hover:bg-white" aria-label="Decrease quantity"><Icon name="minus" className="size-4" /></button>
                <span className="w-7 text-center text-sm font-black" aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} className="flex size-11 items-center justify-center rounded-md text-dark hover:bg-white" aria-label="Increase quantity"><Icon name="plus" className="size-4" /></button>
              </div>
              <button type="button" disabled={!product.available} onClick={handleAddToCart} className={`flex h-12 flex-1 items-center justify-between rounded-lg px-4 text-sm font-extrabold text-white transition disabled:cursor-not-allowed disabled:bg-stone-300 ${added ? "bg-secondary" : "bg-primary hover:bg-primary-hover"}`}>
                <span className="inline-flex items-center gap-2"><Icon name={added ? "check" : "cart"} className="size-5" />{added ? "Added to cart" : product.available ? "Add to cart" : "Unavailable"}</span>
                <span>{formatPrice(totalPrice)}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            ["clock", "30–45 min", "Estimated delivery"],
            ["leaf", "Freshly made", "Prepared after you order"],
            ["delivery", "Delivery & pickup", "Choose at checkout"],
          ].map(([icon, title, copy]) => (
            <div key={title} className="flex items-center gap-2.5 rounded-xl border border-border bg-white p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary"><Icon name={icon as "clock" | "leaf" | "delivery"} className="size-4" /></span>
              <div><p className="text-sm font-extrabold text-dark">{title}</p><p className="text-xs text-muted">{copy}</p></div>
            </div>
          ))}
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-border bg-white py-8 sm:py-10" aria-labelledby="related-heading">
          <div className="site-shell">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">More to enjoy</p><h2 id="related-heading" className="mt-0.5 text-xl font-black tracking-tight text-dark sm:text-2xl">You may also like</h2></div>
              <Link href="/menu" className="hidden text-sm font-bold text-secondary hover:text-primary sm:inline-flex">View full menu →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {relatedProducts.map((item) => <FoodProductCard key={item.id} product={item} compact />)}
            </div>
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-white/95 px-3 py-2 shadow-[0_-8px_30px_rgba(29,37,34,.12)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <div className="flex h-12 items-center rounded-xl border border-border bg-brand-bg p-0.5">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="flex size-10 items-center justify-center" aria-label="Decrease quantity"><Icon name="minus" className="size-3.5" /></button>
            <span className="w-7 text-center text-sm font-black">{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} className="flex size-10 items-center justify-center" aria-label="Increase quantity"><Icon name="plus" className="size-3.5" /></button>
          </div>
          <button type="button" disabled={!product.available} onClick={added ? openCart : handleAddToCart} className={`flex h-12 flex-1 items-center justify-between rounded-xl px-4 text-sm font-extrabold text-white disabled:bg-stone-300 ${added ? "bg-secondary" : "bg-primary"}`}>
            <span>{added ? "View cart" : product.available ? "Add to cart" : "Unavailable"}</span><span>{formatPrice(totalPrice)}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
