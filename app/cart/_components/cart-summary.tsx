"use client";

import Link from "next/link";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice, FREE_DELIVERY_MINIMUM } from "@/app/_lib/cart-calculations";
import { Icon } from "@/app/_ui/icon";
import { CouponForm } from "./coupon-form";

export function CartSummary({ onCheckout, compact = false }: { onCheckout?: () => void; compact?: boolean }) {
  const { subtotal, discount, deliveryCharge, total } = useCart();
  const remaining = Math.max(0, FREE_DELIVERY_MINIMUM - subtotal);

  return (
    <section aria-labelledby="order-summary-heading" className={compact ? "space-y-2.5" : "space-y-4"}>
      <div className={compact ? "space-y-0.5" : ""}>
        <h2 id="order-summary-heading" className={compact ? "text-base font-extrabold text-dark" : "text-lg font-extrabold text-dark"}>
          Order summary
        </h2>
        {remaining > 0 ? (
          <p className="text-xs text-muted">Add {formatPrice(remaining)} more for free delivery.</p>
        ) : (
          <p className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
            <Icon name="check" className="size-3.5" /> Free delivery unlocked
          </p>
        )}
      </div>

      <CouponForm compact={compact} />

      <dl className={`border-y border-border text-xs sm:text-sm ${compact ? "space-y-1.5 py-2" : "space-y-2.5 py-3"}`}>
        <div className="flex justify-between gap-4"><dt className="text-muted">Subtotal</dt><dd className="font-semibold text-dark">{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-muted">Delivery</dt><dd className="font-semibold text-dark">{deliveryCharge ? formatPrice(deliveryCharge) : "Free"}</dd></div>
        {discount > 0 && (
          <div className="flex justify-between gap-4 text-secondary"><dt>Discount</dt><dd className="font-semibold">−{formatPrice(discount)}</dd></div>
        )}
      </dl>

      <div className="flex items-end justify-between gap-4">
        <div><p className="text-xs text-muted">Total</p><p className="text-[11px] text-muted">Including delivery</p></div>
        <p className={`${compact ? "text-xl" : "text-2xl"} font-extrabold text-dark`}>{formatPrice(total)}</p>
      </div>

      <Link
        href="/checkout"
        onClick={onCheckout}
        className="section-action section-action-compact w-full bg-primary text-white shadow-sm hover:bg-primary-hover font-bold text-xs sm:text-sm"
      >
        Proceed to checkout
        <Icon name="arrow" className="size-4" />
      </Link>
    </section>
  );
}
