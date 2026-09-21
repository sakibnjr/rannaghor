"use client";

import { useRef } from "react";
import { Icon } from "@/app/_ui/icon";
import type { OfferFilter, OfferFilterOption, OfferSort } from "../_types/offer";

interface OffersSidebarProps {
  query: string;
  category: OfferFilter;
  sort: OfferSort;
  categories: OfferFilterOption[];
  counts: Record<string, number>;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: OfferFilter) => void;
  onSortChange: (value: OfferSort) => void;
}

export function OffersSidebar(props: OffersSidebarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <aside
      aria-label="Offer filters"
      className="hidden self-start lg:sticky lg:top-20 lg:block lg:w-full"
    >
      <div className="flex max-h-[calc(100vh-6rem)] flex-col rounded-2xl border border-border bg-white p-3 shadow-2xs">
        {/* Top filter controls */}
        <div className="shrink-0 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-dark">Filter deals</h2>
            {(props.query || props.category !== "all" || props.sort !== "featured") && (
              <button
                type="button"
                onClick={() => {
                  props.onQueryChange("");
                  props.onCategoryChange("all");
                  props.onSortChange("featured");
                }}
                className="text-xs font-bold text-primary hover:text-primary-hover"
              >
                Reset
              </button>
            )}
          </div>

          <label className="flex min-h-10 items-center gap-2 rounded-lg border border-border bg-brand-bg px-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
            <Icon name="search" className="size-4 shrink-0 text-muted" />
            <span className="sr-only">Search offers</span>
            <input
              ref={searchInputRef}
              type="search"
              value={props.query}
              onChange={(event) => props.onQueryChange(event.target.value)}
              placeholder="Search deals..."
              className="min-w-0 flex-1 bg-transparent text-sm text-dark outline-none placeholder:text-muted"
            />
            {props.query && (
              <button
                type="button"
                onClick={() => props.onQueryChange("")}
                aria-label="Clear search"
                className="text-muted hover:text-dark"
              >
                <Icon name="close" className="size-3.5" />
              </button>
            )}
          </label>

          <div>
            <label
              htmlFor="offers-sort"
              className="text-xs font-bold uppercase tracking-[0.12em] text-muted"
            >
              Sort by
            </label>
            <select
              id="offers-sort"
              value={props.sort}
              onChange={(event) => props.onSortChange(event.target.value as OfferSort)}
              className="mt-1 min-h-10 w-full cursor-pointer rounded-lg border border-border bg-brand-bg px-2.5 text-sm font-bold text-dark outline-none focus:border-primary"
            >
              <option value="featured">Featured deals</option>
              <option value="savings">Biggest savings</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Scrollable Categories List */}
        <div className="mt-3 flex min-h-0 flex-1 flex-col border-t border-border pt-2.5">
          <p className="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Deal categories
          </p>
          <div className="custom-scrollbar mt-1.5 flex flex-col gap-0.5 overflow-y-auto pr-1">
            {props.categories.map((item) => {
              const active = props.category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => props.onCategoryChange(item.id)}
                  className={`flex min-h-9 w-full min-w-0 cursor-pointer items-center justify-between gap-1.5 rounded-lg px-2.5 py-1.5 text-left text-xs font-bold transition-colors ${
                    active
                      ? "bg-primary-light font-extrabold text-primary"
                      : "text-dark hover:bg-brand-bg hover:text-primary"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span
                    className={`shrink-0 text-[11px] font-semibold ${
                      active ? "text-primary" : "text-muted"
                    }`}
                  >
                    {props.counts[item.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
