"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
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

  return (
    <AnimatePresence>
      {isOpen && (
      <m.div key="cart-drawer" className="fixed inset-0 z-[60]" role="presentation">
        <m.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-dark/55 backdrop-blur-[2px]"
          onClick={closeCart}
          aria-label="Close cart"
          tabIndex={-1}
        />
        <m.aside
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="absolute inset-y-0 right-0 flex w-full flex-col bg-brand-bg shadow-2xl sm:max-w-[460px]"
        >
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-5 sm:px-6">
          <h2 id="cart-drawer-title" className="text-xl font-extrabold text-dark">
            Cart <span className="text-base font-medium text-muted">({itemCount})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-dark hover:border-primary hover:text-primary transition-colors"
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
            {/* Scrollable Cart Items List - Independent scroll container with room for 2+ cards */}
            <div className="custom-scrollbar flex-1 min-h-[200px] overflow-y-auto px-5 sm:px-6">
              <div className="divide-y divide-border">
                <AnimatePresence initial={false}>
                  {items.map((item) => <CartItemRow key={item.key} item={item} compact />)}
                </AnimatePresence>
              </div>
            </div>

            {/* Pinned Footer with Order Summary and Checkout */}
            <footer className="shrink-0 border-t border-border bg-white px-5 py-3.5 sm:px-6 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
              <CartSummary onCheckout={closeCart} compact />
              <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-border/60">
                <Link href="/cart" onClick={closeCart} className="font-bold text-secondary underline underline-offset-4 hover:text-primary">
                  View full cart
                </Link>
                <button type="button" onClick={clearCart} className="font-semibold text-muted hover:text-primary transition-colors">
                  Clear cart
                </button>
              </div>
            </footer>
          </>
        )}
        </m.aside>
      </m.div>
      )}
    </AnimatePresence>
  );
}
