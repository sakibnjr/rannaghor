"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Icon } from "@/app/_ui/icon";
import { FoodProductCard } from "@/app/_components/food-product-card";
import { menuCategories, menuProducts, normalizeCategory } from "../_data/menu-products";
import type { MenuSort } from "../_types/menu";
import { MenuToolbar } from "./menu-toolbar";

export function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<MenuSort>("popular");
  const [availableOnly, setAvailableOnly] = useState(false);

  const counts = useMemo(() => Object.fromEntries(menuCategories.map((item) => [
    item.id,
    item.id === "all" ? menuProducts.length : menuProducts.filter((product) => normalizeCategory(product.categoryId) === item.id).length,
  ])), []);

  const products = useMemo(() => {
    const term = query.trim().toLowerCase();
    const result = menuProducts.filter((product) => {
      const matchesCategory = category === "all" || normalizeCategory(product.categoryId) === category;
      const matchesAvailability = !availableOnly || product.available;
      const matchesSearch = !term || `${product.name} ${product.description} ${product.categoryId}`.toLowerCase().includes(term);
      return matchesCategory && matchesAvailability && matchesSearch;
    });

    return result.toSorted((first, second) => {
      if (sort === "price-low") return first.price - second.price;
      if (sort === "price-high") return second.price - first.price;
      if (sort === "rating") return second.rating - first.rating;
      return Number(second.bestseller) - Number(first.bestseller) || second.reviewCount - first.reviewCount;
    });
  }, [availableOnly, category, query, sort]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setAvailableOnly(false);
    setSort("popular");
  }

  return (
    <section aria-labelledby="menu-results-heading">
      <MenuToolbar
        query={query}
        category={category}
        sort={sort}
        availableOnly={availableOnly}
        categories={menuCategories}
        counts={counts}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onAvailabilityChange={setAvailableOnly}
      />

      <div className="site-shell pb-12 pt-4 sm:pb-16 sm:pt-4">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 id="menu-results-heading" className="text-2xl font-bold tracking-tight text-dark sm:text-3xl">
              {category === "all" ? "All dishes" : menuCategories.find((item) => item.id === category)?.label}
            </h2>
          </div>
          <p className="text-sm text-muted" role="status">{products.length} {products.length === 1 ? "dish" : "dishes"}</p>
        </div>

        {products.length > 0 ? (
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={`${category}-${sort}-${availableOnly}-${query.trim()}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
            >
              {products.map((product, index) => (
                <m.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index, 7) * 0.035 }}
                >
                  <FoodProductCard product={product} compact />
                </m.div>
              ))}
            </m.div>
          </AnimatePresence>
        ) : (
          <div className="rounded-3xl border border-border bg-surface px-6 py-16 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-light text-primary"><Icon name="search" className="size-6" /></span>
            <h3 className="mt-4 text-xl font-bold text-dark">No dishes found</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">Try another search or clear the filters to browse the complete menu.</p>
            <button type="button" onClick={clearFilters} className="section-action mt-5 bg-primary text-white hover:bg-primary-hover">Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
