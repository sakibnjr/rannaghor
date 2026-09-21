"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice, getCartItemUnitPrice } from "@/app/_lib/cart-calculations";

export function CheckoutOrderSummary() {
  const { items, itemCount, subtotal, discount, deliveryCharge, total } = useCart();

  return (
    <aside className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-20">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-extrabold">Your order</h2>
        <Link href="/cart" className="text-sm font-bold text-secondary underline underline-offset-4">Edit cart</Link>
      </div>
      <p className="mt-1 text-sm text-muted">{itemCount} {itemCount === 1 ? "item" : "items"}</p>

      <div className="my-4 max-h-56 space-y-3 overflow-y-auto border-y border-border py-4">
        {items.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-stone-100">
              <Image src={item.product.image} alt="" fill sizes="48px" className="object-cover" />
              <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-bl-lg bg-dark text-[10px] font-bold text-white">{item.quantity}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{item.product.name}</p>
              {item.variant && <p className="text-xs text-muted">{item.variant.name}</p>}
            </div>
            <p className="text-sm font-bold">{formatPrice(getCartItemUnitPrice(item) * item.quantity)}</p>
          </div>
        ))}
      </div>

      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{deliveryCharge ? formatPrice(deliveryCharge) : "Free"}</dd></div>
        {discount > 0 && <div className="flex justify-between text-secondary"><dt>Discount</dt><dd>−{formatPrice(discount)}</dd></div>}
        <div className="flex items-end justify-between border-t border-border pt-3">
          <dt className="font-bold">Total</dt><dd className="text-xl font-extrabold">{formatPrice(total)}</dd>
        </div>
      </dl>
    </aside>
  );
}
