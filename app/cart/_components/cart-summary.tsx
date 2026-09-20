"use client";

import Link from "next/link";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice, FREE_DELIVERY_MINIMUM } from "@/app/_lib/cart-calculations";
import { Icon } from "@/app/_ui/icon";
import { CouponForm } from "./coupon-form";

export function CartSummary({ onCheckout }: { onCheckout?: () => void }) {
  const { subtotal, discount, deliveryCharge, total } = useCart();
  const remaining = Math.max(0, FREE_DELIVERY_MINIMUM - subtotal);

  return (
    <section aria-labelledby="order-summary-heading" className="space-y-5">
      <div>
        <h2 id="order-summary-heading" className="text-lg font-extrabold text-dark">Order summary</h2>
        {remaining > 0 ? (
          <p className="mt-1 text-xs text-muted">Add {formatPrice(remaining)} more for free delivery.</p>
        ) : (
          <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-secondary">
            <Icon name="check" className="size-3.5" /> Free delivery unlocked
          </p>
        )}
      </div>

      <CouponForm />

      <dl className="space-y-3 border-y border-border py-4 text-sm">
        <div className="flex justify-between gap-4"><dt className="text-muted">Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-muted">Delivery</dt><dd className="font-semibold">{deliveryCharge ? formatPrice(deliveryCharge) : "Free"}</dd></div>
        {discount > 0 && (
          <div className="flex justify-between gap-4 text-secondary"><dt>Discount</dt><dd className="font-semibold">−{formatPrice(discount)}</dd></div>
        )}
      </dl>

      <div className="flex items-end justify-between gap-4">
        <div><p className="text-sm text-muted">Total</p><p className="text-xs text-muted">Including delivery</p></div>
        <p className="text-2xl font-extrabold text-dark">{formatPrice(total)}</p>
      </div>

      <Link
        href="/checkout"
        onClick={onCheckout}
        className="section-action w-full bg-primary text-base text-white shadow-sm hover:bg-primary-hover"
      >
        Proceed to checkout
        <Icon name="arrow" className="size-4" />
      </Link>
    </section>
  );
}
