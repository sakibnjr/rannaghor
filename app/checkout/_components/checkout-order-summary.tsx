"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as m from "motion/react-m";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice, getCartItemUnitPrice } from "@/app/_lib/cart-calculations";
import { Icon } from "@/app/_ui/icon";

export function CheckoutOrderSummary() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    deliveryCharge,
    total,
    couponCode,
    couponFeedback,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeItem,
  } = useCart();

  const [inputCode, setInputCode] = useState("");

  function handleApplyCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyCoupon(inputCode);
  }

  return (
    <aside
      aria-label="Order summary"
      className="self-start lg:sticky lg:top-20 lg:block lg:w-full"
    >
      <div className="flex max-h-[calc(100vh-6rem)] flex-col rounded-xl sm:rounded-2xl border border-border bg-white p-3 sm:p-5 shadow-2xs sm:shadow-sm">
        {/* Pinned Top Header */}
        <div className="flex shrink-0 items-center justify-between gap-2.5 border-b border-border pb-2.5 sm:pb-3">
          <div>
            <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-dark">Order summary</h2>
            <p className="text-[11px] sm:text-xs text-muted">
              {itemCount} {itemCount === 1 ? "item" : "items"} in bag
            </p>
          </div>
          <Link
            href="/menu"
            className="rounded-lg border border-border bg-brand-bg px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-bold text-dark hover:border-primary hover:text-primary"
          >
            + Add more
          </Link>
        </div>

        {/* Scrollable Middle Container with Item List & Coupon */}
        <div className="custom-scrollbar my-2 min-h-0 flex-1 space-y-2 sm:space-y-3 overflow-y-auto pr-1">
          {/* Cart Items */}
          {items.map((item) => {
            const unitPrice = getCartItemUnitPrice(item);
            return (
              <div
                key={item.key}
                className="flex items-start gap-2.5 rounded-lg sm:rounded-xl border border-border/70 bg-brand-bg/40 p-2 sm:p-2.5"
              >
                {/* Thumbnail */}
                <div className="relative size-10 sm:size-12 shrink-0 overflow-hidden rounded-md sm:rounded-lg bg-stone-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                {/* Details & Controls */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <p className="truncate text-xs sm:text-sm font-bold text-dark">
                      {item.product.name}
                    </p>
                    <p className="shrink-0 text-xs sm:text-sm font-extrabold text-dark">
                      {formatPrice(unitPrice * item.quantity)}
                    </p>
                  </div>

                  {item.variant && (
                    <p className="text-[10px] sm:text-[11px] font-semibold text-primary">{item.variant.name}</p>
                  )}

                  {item.addOns && item.addOns.length > 0 && (
                    <p className="truncate text-[9px] sm:text-[10px] text-muted">
                      +{item.addOns.map((a) => a.name).join(", ")}
                    </p>
                  )}

                  {/* Quantity Stepper */}
                  <div className="mt-1.5 flex items-center justify-between">
                    <div className="flex items-center rounded-md sm:rounded-lg border border-border bg-white shadow-2xs">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="flex size-5 sm:size-6 items-center justify-center text-muted hover:text-primary"
                      >
                        <Icon name="minus" className="size-2.5 sm:size-3" />
                      </button>
                      <span className="w-4 sm:w-5 text-center text-[11px] sm:text-xs font-black text-dark">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="flex size-5 sm:size-6 items-center justify-center text-muted hover:text-primary"
                      >
                        <Icon name="plus" className="size-2.5 sm:size-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remove ${item.product.name}`}
                      className="text-[10px] sm:text-[11px] font-bold text-muted hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Coupon Voucher Box */}
          <div className="border-t border-border pt-2">
            {couponCode ? (
              <div className="flex items-center justify-between rounded-lg sm:rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 sm:px-3 sm:py-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🎟️</span>
                  <div>
                    <p className="text-[11px] sm:text-xs font-extrabold text-emerald-800">
                      {couponCode} Applied (−{formatPrice(discount)})
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-emerald-600">Promotion discount active</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-[11px] sm:text-xs font-bold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-1">
                  <label className="flex min-h-8 sm:min-h-9 flex-1 items-center gap-1.5 rounded-lg border border-border bg-brand-bg px-2 sm:px-2.5 focus-within:border-primary">
                    <span className="text-[11px] sm:text-xs">🎟️</span>
                    <span className="sr-only">Coupon code</span>
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      className="w-full bg-transparent text-[11px] sm:text-xs font-bold uppercase tracking-wider text-dark outline-none placeholder:text-muted"
                    />
                  </label>
                  <m.button
                    type="submit"
                    whileTap={{ scale: 0.96 }}
                    className="rounded-lg bg-dark px-2.5 sm:px-3 text-[11px] sm:text-xs font-bold text-white hover:bg-black"
                  >
                    Apply
                  </m.button>
                </div>

                {/* Quick coupon helper button */}
                <button
                  type="button"
                  onClick={() => {
                    setInputCode("RANNA100");
                    applyCoupon("RANNA100");
                  }}
                  className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-primary hover:underline"
                >
                  <span>💡 Try code</span>
                  <span className="rounded bg-primary-light px-1 font-extrabold">RANNA100</span>
                </button>

                {couponFeedback && (
                  <p
                    role="status"
                    className={`text-[10px] sm:text-[11px] font-bold ${
                      couponFeedback.tone === "success" ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Pinned Bottom Bill Calculation & Trust Badges */}
        <div className="shrink-0 border-t border-border pt-2.5 sm:pt-3">
          <dl className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs lg:text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Items Subtotal</dt>
              <dd className="font-bold text-dark">{formatPrice(subtotal)}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted">Delivery Charge</dt>
              <dd className="font-bold text-dark">
                {deliveryCharge > 0 ? (
                  formatPrice(deliveryCharge)
                ) : (
                  <span className="text-emerald-600">Free</span>
                )}
              </dd>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <dt className="font-semibold">Discount</dt>
                <dd className="font-extrabold">−{formatPrice(discount)}</dd>
              </div>
            )}

            <div className="flex items-end justify-between border-t border-dashed border-border pt-2">
              <div>
                <dt className="text-xs sm:text-sm font-extrabold text-dark">Grand Total</dt>
                <p className="text-[9px] sm:text-[10px] text-muted">Inclusive of all taxes</p>
              </div>
              <dd className="text-base sm:text-lg lg:text-xl font-black text-primary">{formatPrice(total)}</dd>
            </div>
          </dl>

          {/* Trust Badges Footer */}
          <div className="mt-2.5 flex items-center justify-center gap-2.5 rounded-lg sm:rounded-xl bg-brand-bg p-1.5 sm:p-2 text-center text-[9px] sm:text-[10px] font-semibold text-muted">
            <span className="inline-flex items-center gap-1">
              <Icon name="check" className="size-2.5 sm:size-3 text-emerald-600" /> 100% Halal Food
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="clock" className="size-2.5 sm:size-3 text-secondary" /> Fast 30–45m Delivery
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
