"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice } from "@/app/_lib/cart-calculations";
import { Badge } from "@/app/_ui/badge";
import { Icon } from "@/app/_ui/icon";
import { RatingStars } from "@/app/_ui/rating-stars";
import { OfferCard } from "../../../offers/_components/offer-card";
import { getOfferSlug } from "../../_data/offer-campaigns";
import type { OfferCampaign } from "../../_types/offer";

interface OfferDetailProps {
  offer: OfferCampaign;
  relatedOffers: OfferCampaign[];
}

export function OfferDetail({ offer, relatedOffers }: OfferDetailProps) {
  const { addToCart, openCart } = useCart();
  const [instructions, setInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const saving = offer.originalPrice - offer.discountedPrice;
  const unitPrice = offer.discountedPrice;
  const totalPrice = unitPrice * quantity;

  function handleAddToCart() {
    addToCart(
      {
        id: offer.id,
        name: offer.title,
        slug: getOfferSlug(offer),
        description: offer.subtitle,
        image: offer.image,
        price: offer.discountedPrice,
        oldPrice: offer.originalPrice,
        rating: offer.rating ?? 4.9,
        reviewCount: offer.reviewCount ?? 200,
        categoryId: "offers",
        available: true,
      },
      {
        instructions: instructions.trim() || undefined,
        quantity,
      },
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <main className="flex-1 pb-24 lg:pb-0">
      {/* Compact Breadcrumb */}
      <div className="site-shell py-2">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-semibold text-muted"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Icon name="right" className="size-3" />
          <Link href="/offers" className="hover:text-primary">
            Offers
          </Link>
          <Icon name="right" className="size-3" />
          <span aria-current="page" className="truncate text-dark">
            {offer.title}
          </span>
        </nav>
      </div>

      {/* Main Offer Card */}
      <section className="site-shell pb-5 sm:pb-6" aria-labelledby="offer-title">
        <div className="grid overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:grid-cols-[1.02fr_.98fr]">
          {/* Left Media Column */}
          <div className="relative h-[190px] overflow-hidden bg-stone-100 xs:h-[220px] sm:h-[270px] md:h-[320px] lg:h-auto lg:min-h-[480px]">
            <Image
              src={offer.image}
              alt={`${offer.title}, restaurant special combo package`}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 54vw"
              className="object-cover"
            />
            {/* Top-left badges */}
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 sm:left-4 sm:top-4">
              <Badge variant="bestseller">{offer.label}</Badge>
              {saving > 0 && <Badge variant="success">Save {formatPrice(saving)}</Badge>}
              <Badge variant="neutral">
                {offer.category.toUpperCase()} DEAL
              </Badge>
            </div>

            {/* Octagon Save Badge for larger screens */}
            {saving > 0 && (
              <div
                className="absolute right-3 top-3 flex size-12 sm:size-14 flex-col items-center justify-center bg-secondary text-center text-white shadow-md [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]"
                aria-hidden="true"
              >
                <span className="text-[8px] sm:text-[9px] font-medium leading-none">SAVE</span>
                <strong className="mt-0.5 text-xs sm:text-sm font-extrabold leading-tight">
                  ৳{saving}
                </strong>
              </div>
            )}

            {/* Bottom-left availability pill */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-secondary shadow-md backdrop-blur sm:bottom-4 sm:left-4">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>{offer.availability}</span>
            </div>
          </div>

          {/* Right Info Column */}
          <div className="flex flex-col p-3.5 sm:p-4.5 lg:p-5">
            <div className="border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  Special Combo • {offer.category}
                </span>
                <span className="inline-block size-1 rounded-full bg-muted/40" />
                <span className="text-xs font-semibold text-secondary">
                  Limited Time
                </span>
              </div>

              <h1
                id="offer-title"
                className="mt-1 text-2xl font-black tracking-tight text-dark sm:text-3xl lg:text-4xl lg:leading-tight"
              >
                {offer.title}
              </h1>

              <div className="mt-1.5 flex items-center gap-3">
                <RatingStars
                  score={offer.rating ?? 4.9}
                  count={offer.reviewCount ?? 280}
                />
                <span className="text-xs font-medium text-muted">
                  Verified combo deal
                </span>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                {offer.description}
              </p>

              {/* Pricing breakdown */}
              <div className="mt-3 flex items-baseline gap-2.5">
                <strong className="text-2xl font-black text-dark sm:text-3xl">
                  {formatPrice(offer.discountedPrice)}
                </strong>
                <span className="text-base font-medium text-muted line-through">
                  {formatPrice(offer.originalPrice)}
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-extrabold text-emerald-800">
                  {offer.savingsBadge}
                </span>
              </div>
            </div>

            {/* Combo Package Inclusions List */}
            {offer.items && offer.items.length > 0 && (
              <div className="border-b border-border py-3">
                <p className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-dark sm:text-sm">
                  <span>What&apos;s Included in this Combo</span>
                  <span className="text-xs font-bold text-secondary">
                    {offer.items.length} items
                  </span>
                </p>
                <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {offer.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg border border-border/80 bg-brand-bg/60 px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-dark"
                    >
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                        <Icon name="check" className="size-2.5" />
                      </span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="py-3">
              <label
                htmlFor="instructions"
                className="text-xs font-extrabold uppercase tracking-wider text-dark sm:text-sm"
              >
                Special instructions{" "}
                <span className="text-xs font-medium normal-case text-muted">
                  (optional)
                </span>
              </label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                maxLength={160}
                rows={2}
                placeholder="Less spicy, extra chutney, beverage preference…"
                className="mt-1.5 w-full resize-none rounded-lg border border-border bg-brand-bg px-2.5 py-2 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <p className="mt-1 text-right text-xs text-muted">
                {instructions.length}/160
              </p>
            </div>

            {/* Desktop Stepper & Add to Cart */}
            <div className="mt-auto hidden items-center gap-2.5 lg:flex">
              <div
                className="flex h-12 items-center rounded-lg border border-border bg-brand-bg p-0.5"
                aria-label="Quantity selector"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex size-11 items-center justify-center rounded-md text-dark hover:bg-white"
                  aria-label="Decrease quantity"
                >
                  <Icon name="minus" className="size-4" />
                </button>
                <span
                  className="w-7 text-center text-sm font-black"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                  className="flex size-11 items-center justify-center rounded-md text-dark hover:bg-white"
                  aria-label="Increase quantity"
                >
                  <Icon name="plus" className="size-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex h-12 flex-1 items-center justify-between rounded-lg px-4 text-sm font-extrabold text-white transition ${
                  added ? "bg-secondary" : "bg-primary hover:bg-primary-hover"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name={added ? "check" : "cart"} className="size-5" />
                  {added ? "Combo added to cart!" : "Add combo to cart"}
                </span>
                <span>{formatPrice(totalPrice)}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Quick Value Badges */}
        <div className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
          {[
            ["clock", "30–45 min", "Fast combo delivery"],
            ["leaf", "Freshly prepared", "Cooked hot to order"],
            ["delivery", "Delivery & pickup", "Available for both at checkout"],
          ].map(([icon, title, copy]) => (
            <div
              key={title}
              className="flex items-center gap-2 rounded-xl border border-border bg-white p-2.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                <Icon
                  name={icon as "clock" | "leaf" | "delivery"}
                  className="size-4"
                />
              </span>
              <div>
                <p className="text-sm font-extrabold text-dark">{title}</p>
                <p className="text-xs text-muted">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Deals Section */}
      {relatedOffers.length > 0 && (
        <section
          className="border-t border-border bg-white py-6 sm:py-8"
          aria-labelledby="related-deals-heading"
        >
          <div className="site-shell">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  More Value Bundles
                </p>
                <h2
                  id="related-deals-heading"
                  className="mt-0.5 text-xl font-black tracking-tight text-dark sm:text-2xl"
                >
                  More special deals for you
                </h2>
              </div>
              <Link
                href="/offers"
                className="hidden text-sm font-bold text-secondary hover:text-primary sm:inline-flex"
              >
                View all deals →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {relatedOffers.map((deal) => (
                <OfferCard key={deal.id} offer={deal} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fixed Bottom Bar on Mobile */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-white/95 px-3 py-2 shadow-[0_-8px_30px_rgba(29,37,34,.12)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <div className="flex h-12 items-center rounded-xl border border-border bg-brand-bg p-0.5">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="flex size-10 items-center justify-center"
              aria-label="Decrease quantity"
            >
              <Icon name="minus" className="size-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-black">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(10, value + 1))}
              className="flex size-10 items-center justify-center"
              aria-label="Increase quantity"
            >
              <Icon name="plus" className="size-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={added ? openCart : handleAddToCart}
            className={`flex h-12 flex-1 items-center justify-between rounded-xl px-4 text-sm font-extrabold text-white ${
              added ? "bg-secondary" : "bg-primary"
            }`}
          >
            <span>{added ? "View in cart" : "Add combo to cart"}</span>
            <span>{formatPrice(totalPrice)}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
