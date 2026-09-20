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
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Search Button & Popover */}
      <div className="relative">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex size-11 items-center justify-center p-2 text-[#1D2522] hover:text-[#E8572A] hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Search food"
        >
          <Icon name="search" />
        </button>

        <AnimatePresence>
          {showSearch && (
          <m.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-[#EAE5E1] bg-white p-2 shadow-xl"
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
        className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#1D2522] hover:text-[#E8572A] transition-colors py-1"
      >
        <Icon name="account" />
        <span>Login / Account</span>
      </Link>

      {/* Cart Button with Count Badge */}
      <button
        type="button"
        onClick={openCart}
        className="relative flex size-11 items-center justify-center p-2 text-[#1D2522] hover:text-[#E8572A] transition-colors"
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
        className="inline-flex items-center justify-center bg-[#E8572A] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-xs hover:bg-[#D24519] hover:shadow-md active:scale-98 transition-all"
      >
        Order Now
      </Link>
    </div>
  );
}
