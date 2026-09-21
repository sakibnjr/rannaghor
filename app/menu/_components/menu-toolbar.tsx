"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/app/_ui/icon";
import * as m from "motion/react-m";
import type { MenuCategoryFilter, MenuSort } from "../_types/menu";

interface MenuToolbarProps {
  query: string;
  category: string;
  sort: MenuSort;
  availableOnly: boolean;
  categories: MenuCategoryFilter[];
  counts: Record<string, number>;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: MenuSort) => void;
  onAvailabilityChange: (value: boolean) => void;
}

export function MenuToolbar(props: MenuToolbarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusSearch = () => {
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    if (window.sessionStorage.getItem("focus-menu-search") === "true") {
      window.sessionStorage.removeItem("focus-menu-search");
      window.requestAnimationFrame(focusSearch);
    }

    window.addEventListener("focus-menu-search", focusSearch);
    return () => window.removeEventListener("focus-menu-search", focusSearch);
  }, []);

  return (
    <div className="sticky top-14 z-30 border-b border-border bg-brand-bg/95 py-1.5 sm:py-2 backdrop-blur-md">
      <div className="site-shell px-3 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-white p-1.5 sm:p-2 shadow-2xs">
          {/* Row 1: Combined Search + Sort + Available */}
          <div className="flex items-center gap-1.5 lg:grid lg:grid-cols-[minmax(0,1fr)_200px_150px] lg:gap-2">
            {/* Search Input */}
            <label className="flex min-h-8.5 sm:min-h-9 flex-1 items-center gap-2 rounded-lg border border-border bg-brand-bg px-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <Icon name="search" className="size-4 text-muted shrink-0" />
              <span className="sr-only">Search the menu</span>
              <input
                ref={searchInputRef}
                type="search"
                value={props.query}
                onChange={(event) => props.onQueryChange(event.target.value)}
                placeholder="Search dishes..."
                className="w-full bg-transparent text-xs sm:text-sm text-dark outline-none placeholder:text-muted"
              />
              {props.query && (
                <button
                  type="button"
                  onClick={() => props.onQueryChange("")}
                  aria-label="Clear search"
                  className="text-muted hover:text-dark shrink-0"
                >
                  <Icon name="close" className="size-3.5" />
                </button>
              )}
            </label>

            {/* Sort Dropdown */}
            <label className="flex min-h-8.5 sm:min-h-9 shrink-0 items-center gap-1 sm:gap-1.5 rounded-lg border border-border bg-brand-bg px-2 text-xs focus-within:border-primary">
              <span className="hidden text-muted sm:inline font-semibold">Sort</span>
              <select
                aria-label="Sort dishes"
                value={props.sort}
                onChange={(event) => props.onSortChange(event.target.value as MenuSort)}
                className="min-w-0 bg-transparent text-xs sm:text-sm font-bold text-dark outline-none cursor-pointer pr-1"
              >
                <option value="popular">Popular</option>
                <option value="rating">Top rated</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
              </select>
            </label>

            {/* Available Toggle */}
            <m.button
              type="button"
              aria-pressed={props.availableOnly}
              onClick={() => props.onAvailabilityChange(!props.availableOnly)}
              animate={{ scale: props.availableOnly ? 1.015 : 1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={props.availableOnly ? "Showing available items only" : "Filter by available items"}
              className={`inline-flex min-h-8.5 sm:min-h-9 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg border px-2 sm:px-3 text-xs font-bold transition-colors ${
                props.availableOnly
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-brand-bg text-dark hover:border-primary hover:text-primary"
              }`}
            >
              <Icon name="check" className="size-3 sm:size-3.5" />
              <span className="hidden xs:inline sm:inline">Open</span>
            </m.button>
          </div>

          {/* Row 2: Category Chips */}
          <div
            className="no-scrollbar mt-1.5 flex gap-1.5 overflow-x-auto lg:grid lg:grid-flow-col lg:auto-cols-fr lg:overflow-visible"
            aria-label="Menu categories"
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
                  className={`min-h-8 sm:min-h-9 shrink-0 whitespace-nowrap rounded-lg px-2.5 text-[11px] sm:text-xs font-bold transition-colors lg:min-w-0 lg:px-1.5 ${
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
