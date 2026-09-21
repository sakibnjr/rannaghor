"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Icon } from "@/app/_ui/icon";
import { FoodProductCard } from "@/app/_components/food-product-card";
import { menuCategories, menuProducts, normalizeCategory } from "../_data/menu-products";
import type { MenuSort } from "../_types/menu";
import { MenuSidebar } from "./menu-sidebar";
import { MenuToolbar } from "./menu-toolbar";

export function MenuBrowser() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("q") ?? "");
  const [category, setCategory] = useState(searchParams?.get("category") ?? "all");
  const [sort, setSort] = useState<MenuSort>("popular");

  useEffect(() => {
    const qParam = searchParams?.get("q");
    const catParam = searchParams?.get("category");
    if (qParam !== null && qParam !== undefined) {
      setQuery(qParam);
    }
    if (catParam !== null && catParam !== undefined) {
      setCategory(catParam);
    }
  }, [searchParams]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        menuCategories.map((item) => [
          item.id,
          item.id === "all"
            ? menuProducts.length
            : menuProducts.filter((product) => normalizeCategory(product.categoryId) === item.id)
                .length,
        ]),
      ),
    [],
  );

  const products = useMemo(() => {
    const term = query.trim().toLowerCase();
    const result = menuProducts.filter((product) => {
      const matchesCategory =
        category === "all" || normalizeCategory(product.categoryId) === category;
      const matchesSearch =
        !term ||
        `${product.name} ${product.description} ${product.categoryId}`.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    return result.toSorted((first, second) => {
      if (sort === "price-low") return first.price - second.price;
      if (sort === "price-high") return second.price - first.price;
      if (sort === "rating") return second.rating - first.rating;
      return (
        Number(second.bestseller) - Number(first.bestseller) ||
        second.reviewCount - first.reviewCount
      );
    });
  }, [category, query, sort]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setSort("popular");
  }

  return (
    <section aria-labelledby="menu-results-heading">
      <MenuToolbar
        query={query}
        category={category}
        sort={sort}
        categories={menuCategories}
        counts={counts}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />

      <div className="site-shell pb-12 pt-2 sm:pb-16 sm:pt-4 lg:pt-8">
        <div className="lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:items-start lg:gap-5 xl:grid-cols-[230px_minmax(0,1fr)] xl:gap-6">
          <MenuSidebar
            query={query}
            category={category}
            sort={sort}
            categories={menuCategories}
            counts={counts}
            onQueryChange={setQuery}
            onCategoryChange={setCategory}
            onSortChange={setSort}
          />

          <div className="min-w-0">
            <div className="mb-2.5 sm:mb-4 flex items-end justify-between gap-4">
              <div>
                <h2
                  id="menu-results-heading"
                  className="text-xl font-bold tracking-tight text-dark sm:text-3xl"
                >
                  {category === "all"
                    ? "All dishes"
                    : menuCategories.find((item) => item.id === category)?.label}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted" role="status">
                {products.length} {products.length === 1 ? "dish" : "dishes"}
              </p>
            </div>

            {products.length > 0 ? (
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={`${category}-${sort}-${query.trim()}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
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
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Icon name="search" className="size-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-dark">No dishes found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                  Try another search or clear the filters to browse the complete menu.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="section-action mt-5 bg-primary text-white hover:bg-primary-hover"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
