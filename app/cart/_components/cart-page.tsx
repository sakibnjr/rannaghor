"use client";

import Link from "next/link";
import { useCart } from "@/app/_components/cart-context";
import { Icon } from "@/app/_ui/icon";
import { CartEmpty } from "./cart-empty";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";

export function CartPage() {
  const { items, itemCount, clearCart, isReady } = useCart();

  if (!isReady) {
    return (
      <div className="site-shell page-section" aria-busy="true" aria-label="Loading cart">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-stone-200" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="h-40 animate-pulse rounded-3xl bg-white" />
          <div className="h-80 animate-pulse rounded-3xl bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="site-shell page-section">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">Your cart</h1>
          <p className="mt-2 text-sm text-muted">
            {itemCount ? `${itemCount} ${itemCount === 1 ? "item" : "items"} ready to order` : "Your selected dishes will appear here."}
          </p>
        </div>
        {items.length > 0 && (
          <Link href="/menu" className="inline-flex min-h-11 items-center gap-2 font-bold text-secondary hover:text-primary">
            <Icon name="left" className="size-4" /> Continue browsing
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-border bg-white shadow-sm"><CartEmpty /></div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section aria-label="Cart items" className="space-y-4">
            {items.map((item) => <CartItemRow key={item.key} item={item} />)}
            <button type="button" onClick={clearCart} className="min-h-11 px-2 text-sm font-semibold text-muted hover:text-primary">
              Remove all items
            </button>
          </section>
          <aside className="rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
            <CartSummary />
          </aside>
        </div>
      )}
    </div>
  );
}
