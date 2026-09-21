"use client";

import { Icon } from "@/app/_ui/icon";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useCart } from "@/app/_components/cart-context";

export function HeaderActions() {
  const { itemCount, openCart } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center justify-self-end gap-1 sm:gap-1.5">
      {/* Search Button & Popover */}
      <div className="relative">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-brand-bg text-dark shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary xl:size-9"
          aria-label="Search food"
          aria-expanded={showSearch}
        >
          <Icon name="search" />
        </button>

        <AnimatePresence>
          {showSearch && (
          <m.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-border bg-white p-2 shadow-xl"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-xl">
              <Icon name="search" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search dishes"
                placeholder="Search dishes (e.g. Biryani)..."
                className="w-full text-xs bg-transparent focus:outline-none text-[#1D2522]"
                autoFocus
              />
            </div>
          </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login / Account */}
      <Link
        href="/login"
        className="hidden min-h-9 items-center gap-1.5 rounded-full border border-border bg-brand-bg px-2.5 text-sm font-semibold text-dark shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary xl:inline-flex"
      >
        <Icon name="account" className="size-4" />
        <span>Account</span>
      </Link>

      {/* Cart Button with Count Badge */}
      <button
        type="button"
        onClick={openCart}
        className="relative flex size-10 items-center justify-center rounded-full border border-border bg-brand-bg text-dark shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary xl:size-9"
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
