"use client";

import { Icon } from "@/app/_ui/icon";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useCart } from "@/app/_components/cart-context";
import { useSearch } from "@/app/_components/search-context";

export function HeaderActions() {
  const { itemCount, openCart } = useCart();
  const { openSearch } = useSearch();

  return (
    <div className="flex items-center justify-self-end gap-1 sm:gap-1.5">
      {/* Search Button (Opens Search Modal with Suggestions) */}
      <div className="hidden md:block">
        <button
          type="button"
          onClick={() => openSearch()}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-brand-bg text-dark shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary xl:size-9"
          aria-label="Search food and deals (Ctrl+K or /)"
          title="Search food (Ctrl+K)"
        >
          <Icon name="search" className="size-4" />
        </button>
      </div>

      {/* Login / Account — icon only */}
      <Link
        href="/login"
        aria-label="Account"
        className="hidden size-10 items-center justify-center rounded-full border border-border bg-brand-bg text-dark shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary xl:flex xl:size-9"
      >
        <Icon name="account" className="size-4" />
      </Link>

      {/* Cart Button with Count Badge */}
      <button
        type="button"
        onClick={openCart}
        className="relative hidden size-10 items-center justify-center rounded-full border border-border bg-brand-bg text-dark shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary md:flex xl:size-9"
        aria-label={`Cart with ${itemCount} items`}
        aria-haspopup="dialog"
      >
        <Icon name="cart" />
        <AnimatePresence initial={false}>
          {itemCount > 0 && (
            <m.span
              key={itemCount}
              initial={{ opacity: 0, scale: 0.5, y: 4 }}
              animate={{ opacity: 1, scale: [1, 1.28, 1], y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#E8572A] px-1 text-[10px] font-bold text-white shadow-xs"
            >
              {itemCount}
            </m.span>
          )}
        </AnimatePresence>
      </button>

      {/* Order Now CTA Button */}
      <Link
        href="/menu"
        className="hidden min-h-10 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-sm font-bold text-white shadow-sm transition-[background-color,box-shadow,transform] hover:bg-primary-hover hover:shadow-md active:scale-[0.98] sm:inline-flex xl:min-h-9 xl:px-3.5"
      >
        Order Now <Icon name="arrow" className="size-3.5" />
      </Link>
    </div>
  );
}
