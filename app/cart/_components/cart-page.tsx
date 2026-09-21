"use client";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { useCart } from "@/app/_components/cart-context";
import { Icon } from "@/app/_ui/icon";
import { CartEmpty } from "./cart-empty";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";

export function CartPage() {
  const { items, itemCount, clearCart, isReady } = useCart();

  if (!isReady) {
    return (
      <div className="site-shell py-4 sm:py-5" aria-busy="true" aria-label="Loading cart">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-stone-200" />
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="h-40 animate-pulse rounded-3xl bg-white" />
          <div className="h-80 animate-pulse rounded-3xl bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="site-shell py-4 sm:py-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark">Your cart</h1>
          <p className="mt-1 text-sm text-muted">
            {itemCount ? `${itemCount} ${itemCount === 1 ? "item" : "items"} ready to order` : "Your selected dishes will appear here."}
          </p>
        </div>
        {items.length > 0 && (
          <Link href="/menu" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-secondary hover:text-primary">
            <Icon name="left" className="size-4" /> Continue browsing
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-border bg-white shadow-sm"><CartEmpty /></div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section aria-label="Cart items">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xs">
              <div className="hidden grid-cols-[80px_minmax(0,1fr)_120px_100px_40px] gap-4 border-b border-border bg-clay/45 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted lg:grid">
                <span aria-hidden="true" />
                <span>Item</span>
                <span>Quantity</span>
                <span>Price</span>
                <span className="sr-only">Remove</span>
              </div>
              <AnimatePresence initial={false}>
                {items.map((item) => <CartItemRow key={item.key} item={item} />)}
              </AnimatePresence>
            </div>
            <button type="button" onClick={clearCart} className="mt-2 min-h-10 px-2 text-sm font-semibold text-muted hover:text-primary">
              Remove all items
            </button>
          </section>
          <aside className="rounded-2xl border border-border bg-white p-5 shadow-sm lg:sticky lg:top-20">
            <CartSummary />
          </aside>
        </div>
      )}
    </div>
  );
}
