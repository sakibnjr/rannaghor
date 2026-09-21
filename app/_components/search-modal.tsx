"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useCart } from "@/app/_components/cart-context";
import { formatPrice } from "@/app/_lib/cart-calculations";
import { menuCategories, menuProducts, normalizeCategory } from "@/app/menu/_data/menu-products";
import { getOfferSlug, offerCampaigns } from "@/app/offers/_data/offer-campaigns";
import type { Product } from "@/app/_types/product";
import { Badge } from "@/app/_ui/badge";
import { Icon } from "@/app/_ui/icon";
import { useSearch } from "./search-context";

export function SearchModal() {
  const { isOpen, query, setQuery, closeSearch } = useSearch();
  const { addToCart } = useCart();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Real-time matching dishes and offers
  const { matchingProducts, matchingOffers, matchingCategory } = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return {
        matchingProducts: [],
        matchingOffers: [],
        matchingCategory: null,
      };
    }

    const matchedProds = menuProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(term);
      const descMatch = product.description.toLowerCase().includes(term);
      const catMatch = product.categoryId.toLowerCase().includes(term);
      return nameMatch || descMatch || catMatch;
    });

    const matchedOffs = offerCampaigns.filter((offer) => {
      const titleMatch = offer.title.toLowerCase().includes(term);
      const subMatch = offer.subtitle.toLowerCase().includes(term);
      const descMatch = offer.description.toLowerCase().includes(term);
      const itemsMatch = offer.items?.some((item) => item.toLowerCase().includes(term));
      return titleMatch || subMatch || descMatch || itemsMatch;
    });

    const matchedCat = menuCategories.find(
      (cat) => cat.id !== "all" && cat.label.toLowerCase().includes(term),
    );

    return {
      matchingProducts: matchedProds.slice(0, 8),
      matchingOffers: matchedOffs.slice(0, 3),
      matchingCategory: matchedCat ?? null,
    };
  }, [query]);

  const totalResultsCount = matchingProducts.length + matchingOffers.length;

  function handleAddProduct(product: Product, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    window.setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  }

  function handleNavigateToMenu(searchParam?: string) {
    const term = searchParam ?? query.trim();
    closeSearch();
    if (term) {
      router.push(`/menu?q=${encodeURIComponent(term)}`);
    } else {
      router.push("/menu");
    }
  }

  function handleNavigateCategory(categoryId: string) {
    closeSearch();
    router.push(`/menu?category=${categoryId}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (matchingProducts.length === 1 && matchingOffers.length === 0) {
        closeSearch();
        router.push(`/menu/${matchingProducts[0].slug}`);
      } else if (matchingOffers.length === 1 && matchingProducts.length === 0) {
        closeSearch();
        router.push(`/offers/${getOfferSlug(matchingOffers[0])}`);
      } else {
        handleNavigateToMenu();
      }
    }
  }

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-8 sm:p-4 sm:pt-16 md:pt-20"
          role="dialog"
          aria-modal="true"
          aria-label="Search dishes and offers"
        >
          {/* Backdrop blur overlay */}
          <m.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSearch}
            className="fixed inset-0 cursor-default bg-dark/60 backdrop-blur-xs"
            aria-label="Close search"
            tabIndex={-1}
          />

          {/* Modal Container */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 flex max-h-[85vh] sm:max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-white shadow-2xl"
          >
            {/* Header: Search Input */}
            <div className="flex items-center gap-2 border-b border-border bg-white px-3.5 py-3 sm:px-4.5 sm:py-3.5">
              <Icon name="search" className="size-5 shrink-0 text-primary" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search dishes (e.g. Biryani, Burger, Pizza)..."
                className="w-full bg-transparent text-sm font-semibold text-dark outline-none placeholder:text-muted/80 sm:text-base"
                aria-label="Search food and offers"
              />

              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-muted hover:bg-stone-200 hover:text-dark transition-colors cursor-pointer"
                  aria-label="Clear search text"
                >
                  <Icon name="close" className="size-3.5" />
                </button>
              ) : (
                <kbd className="hidden rounded-md border border-border bg-stone-100 px-1.5 py-0.5 text-[11px] font-semibold text-muted sm:inline-block">
                  ESC
                </kbd>
              )}

              <button
                type="button"
                onClick={closeSearch}
                className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-brand-bg text-dark hover:bg-stone-100 transition-colors sm:hidden"
                aria-label="Close"
              >
                <Icon name="close" className="size-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {/* When query is empty */}
              {!query.trim() && (
                <div className="py-8 text-center text-muted">
                  <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-brand-bg text-muted">
                    <Icon name="search" className="size-5" />
                  </span>
                  <p className="mt-2.5 text-xs font-semibold text-muted">
                    Type a dish, burger, biryani, or combo name to see suggestions
                  </p>
                </div>
              )}

              {/* When user is typing and suggestions are available */}
              {query.trim() && (
                <div className="space-y-3">
                  {/* Category Match Banner */}
                  {matchingCategory && (
                    <button
                      type="button"
                      onClick={() => handleNavigateCategory(matchingCategory.id)}
                      className="flex w-full items-center justify-between rounded-xl bg-primary-light border border-primary/20 p-2.5 sm:p-3 text-left transition-colors hover:bg-primary/10 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex size-6 sm:size-7 items-center justify-center rounded-full bg-primary text-white">
                          <Icon name="cloche" className="size-3.5" />
                        </span>
                        <div>
                          <p className="text-xs font-extrabold text-dark">
                            View {matchingCategory.label} Category
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-muted">
                            Browse all {menuProducts.filter((p) => normalizeCategory(p.categoryId) === matchingCategory.id).length} dishes in this category
                          </p>
                        </div>
                      </div>
                      <Icon name="arrow" className="size-3.5 text-primary" />
                    </button>
                  )}

                  {/* Special Offers & Combo Deals Matches */}
                  {matchingOffers.length > 0 && (
                    <div>
                      <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-secondary">
                        Special Combos ({matchingOffers.length})
                      </p>
                      <div className="mt-1.5 space-y-1">
                        {matchingOffers.map((offer) => (
                          <Link
                            key={offer.id}
                            href={`/offers/${getOfferSlug(offer)}`}
                            onClick={closeSearch}
                            className="group flex items-center justify-between gap-2.5 rounded-xl border border-secondary/20 bg-emerald-50/40 p-2 transition-all hover:border-secondary hover:bg-emerald-50 hover:shadow-2xs"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                                <Image
                                  src={offer.image}
                                  alt={offer.title}
                                  fill
                                  sizes="44px"
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <Badge variant="bestseller">{offer.label}</Badge>
                                  <span className="text-[10px] font-bold text-emerald-700">
                                    {offer.savingsBadge}
                                  </span>
                                </div>
                                <p className="truncate text-xs sm:text-sm font-extrabold text-dark group-hover:text-primary transition-colors">
                                  {offer.title}
                                </p>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-xs font-black text-dark">
                                    {formatPrice(offer.discountedPrice)}
                                  </span>
                                  <span className="text-[10px] font-medium text-muted line-through">
                                    {formatPrice(offer.originalPrice)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-secondary bg-white px-2 py-1 text-[11px] font-bold text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                              View →
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Dishes */}
                  {matchingProducts.length > 0 && (
                    <div>
                      <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-muted">
                        Dishes ({matchingProducts.length})
                      </p>
                      <div className="mt-1.5 space-y-1">
                        {matchingProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/menu/${product.slug}`}
                            onClick={closeSearch}
                            className="group flex items-center justify-between gap-2.5 rounded-xl border border-border/80 bg-white p-2 transition-all hover:border-primary hover:bg-stone-50 hover:shadow-2xs"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="44px"
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] font-bold uppercase text-primary">
                                    {product.categoryId}
                                  </span>
                                  <span className="text-[9px] font-bold text-amber-600">
                                    ★ {product.rating}
                                  </span>
                                </div>
                                <p className="truncate text-xs sm:text-sm font-extrabold text-dark group-hover:text-primary transition-colors">
                                  {product.name}
                                </p>
                                <p className="text-xs font-black text-dark">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handleAddProduct(product, e)}
                              className={`inline-flex shrink-0 min-h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-bold text-white transition-colors shadow-2xs cursor-pointer ${
                                addedIds[product.id]
                                  ? "bg-secondary"
                                  : "bg-primary hover:bg-primary-hover"
                              }`}
                            >
                              <Icon
                                name={addedIds[product.id] ? "check" : "plus"}
                                className="size-3"
                              />
                              <span>{addedIds[product.id] ? "Added" : "Add"}</span>
                            </button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty Results State */}
                  {matchingProducts.length === 0 &&
                    matchingOffers.length === 0 &&
                    !matchingCategory && (
                      <div className="py-8 text-center">
                        <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-stone-100 text-muted">
                          <Icon name="search" className="size-5" />
                        </div>
                        <p className="mt-2.5 text-xs sm:text-sm font-extrabold text-dark">
                          No food found for &quot;{query}&quot;
                        </p>
                        <p className="mt-1 text-[11px] text-muted">
                          Try typing &quot;Biryani&quot;, &quot;Burger&quot;, &quot;Pizza&quot; or &quot;Kebab&quot;.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleNavigateToMenu("")}
                          className="mt-3 inline-flex items-center gap-1 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-primary-hover cursor-pointer"
                        >
                          Browse entire menu
                        </button>
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Footer Action Bar */}
            {query.trim() && totalResultsCount > 0 && (
              <div className="flex items-center justify-between border-t border-border bg-stone-50 px-3.5 py-2 sm:px-4">
                <span className="text-[11px] font-semibold text-muted">
                  Found {totalResultsCount} matching results
                </span>
                <button
                  type="button"
                  onClick={() => handleNavigateToMenu()}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-primary hover:underline cursor-pointer"
                >
                  View on menu <Icon name="arrow" className="size-3" />
                </button>
              </div>
            )}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
