"use client";

import { useRef } from "react";
import { Icon } from "@/app/_ui/icon";
import * as m from "motion/react-m";
import type { OfferFilter, OfferFilterOption, OfferSort } from "../_types/offer";

interface OffersToolbarProps {
  query: string;
  category: OfferFilter;
  sort: OfferSort;
  categories: OfferFilterOption[];
  counts: Record<string, number>;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: OfferFilter) => void;
  onSortChange: (value: OfferSort) => void;
}

export function OffersToolbar(props: OffersToolbarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="sticky top-14 z-30 border-b border-border bg-brand-bg/95 py-1.5 backdrop-blur-md sm:py-2 lg:hidden">
      <div className="site-shell px-3 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-white p-1.5 sm:p-2 shadow-2xs">
          {/* Row 1: Search + Sort */}
          <div className="flex items-center gap-1.5">
            {/* Search Input */}
            <label className="flex min-h-8.5 sm:min-h-9 flex-1 items-center gap-2 rounded-lg border border-border bg-brand-bg px-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <Icon name="search" className="size-4 shrink-0 text-muted" />
              <span className="sr-only">Search offers</span>
              <input
                ref={searchInputRef}
                type="search"
                value={props.query}
                onChange={(event) => props.onQueryChange(event.target.value)}
                placeholder="Search deals..."
                className="w-full bg-transparent text-xs sm:text-sm text-dark outline-none placeholder:text-muted"
              />
              {props.query && (
                <button
                  type="button"
                  onClick={() => props.onQueryChange("")}
                  aria-label="Clear search"
                  className="shrink-0 text-muted hover:text-dark"
                >
                  <Icon name="close" className="size-3.5" />
                </button>
              )}
            </label>

            {/* Sort Dropdown */}
            <label className="flex min-h-8.5 sm:min-h-9 shrink-0 items-center gap-1 sm:gap-1.5 rounded-lg border border-border bg-brand-bg px-2 text-xs focus-within:border-primary">
              <span className="hidden font-semibold text-muted sm:inline">Sort</span>
              <select
                aria-label="Sort offers"
                value={props.sort}
                onChange={(event) => props.onSortChange(event.target.value as OfferSort)}
                className="min-w-0 cursor-pointer bg-transparent pr-1 text-xs font-bold text-dark outline-none sm:text-sm"
              >
                <option value="featured">Featured</option>
                <option value="savings">Savings</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
              </select>
            </label>
          </div>

          {/* Row 2: Category Chips */}
          <div
            className="no-scrollbar mt-1.5 flex gap-1.5 overflow-x-auto"
            aria-label="Deal categories"
          >
            {props.categories.map((item) => {
              const active = props.category === item.id;
              return (
                <m.button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => props.onCategoryChange(item.id)}
                  animate={{ scale: active ? 1.025 : 1 }}
                  whileTap={{ scale: 0.96 }}
                  className={`min-h-8 sm:min-h-9 shrink-0 whitespace-nowrap rounded-lg px-2.5 text-[11px] font-bold transition-colors sm:text-xs ${
                    active
                      ? "bg-primary text-white shadow-2xs"
                      : "border border-border bg-white text-dark hover:border-primary hover:text-primary"
                  }`}
                >
                  {item.label}{" "}
                  <span className={active ? "text-white/80" : "text-muted"}>
                    ({props.counts[item.id] ?? 0})
                  </span>
                </m.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
