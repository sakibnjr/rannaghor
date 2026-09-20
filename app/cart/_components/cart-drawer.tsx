"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/app/_components/cart-context";
import { Icon } from "@/app/_ui/icon";
import { CartEmpty } from "./cart-empty";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CartDrawer() {
  const { items, itemCount, isOpen, isReady, closeCart, clearCart } = useCart();
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus());
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [closeCart, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-dark/55 backdrop-blur-[2px]"
        onClick={closeCart}
        aria-label="Close cart"
        tabIndex={-1}
      />
      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-brand-bg shadow-2xl sm:max-w-[460px]"
      >
        <header className="flex min-h-20 items-center justify-between border-b border-border bg-white px-5 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Your order</p>
            <h2 id="cart-drawer-title" className="mt-0.5 text-xl font-extrabold text-dark">
              Cart <span className="text-base font-medium text-muted">({itemCount})</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="flex size-11 items-center justify-center rounded-full border border-border bg-white text-dark hover:border-primary hover:text-primary"
            aria-label="Close cart"
          >
            <Icon name="close" className="size-4" />
          </button>
        </header>

        {!isReady ? (
          <div className="flex flex-1 items-center justify-center text-sm font-semibold text-muted">Loading your cart…</div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center"><CartEmpty onAction={closeCart} /></div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 sm:px-6">
              <div className="divide-y divide-border">
                {items.map((item) => <CartItemRow key={item.key} item={item} compact />)}
              </div>
            </div>
            <footer className="border-t border-border bg-white px-5 py-5 sm:px-6">
              <CartSummary onCheckout={closeCart} />
              <div className="mt-3 flex items-center justify-between text-xs">
                <Link href="/cart" onClick={closeCart} className="font-bold text-secondary underline underline-offset-4">
                  View full cart
                </Link>
                <button type="button" onClick={clearCart} className="font-semibold text-muted hover:text-primary">
                  Clear cart
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
