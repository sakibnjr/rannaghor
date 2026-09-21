"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Icon } from "@/app/_ui/icon";
import { offerCampaigns, offerFilters } from "../_data/offer-campaigns";
import type { OfferFilter, OfferSort } from "../_types/offer";
import { OfferCard } from "./offer-card";
import { OffersSidebar } from "./offers-sidebar";
import { OffersToolbar } from "./offers-toolbar";

export function OffersBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<OfferFilter>("all");
  const [sort, setSort] = useState<OfferSort>("featured");

  const counts = useMemo(
    () =>
      Object.fromEntries(
        offerFilters.map((filter) => [
          filter.id,
          filter.id === "all"
            ? offerCampaigns.length
            : offerCampaigns.filter((offer) => offer.category === filter.id).length,
        ]),
      ),
    [],
  );

  const offers = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = offerCampaigns.filter((offer) => {
      const matchesCategory = category === "all" || offer.category === category;
      const itemsText = offer.items?.join(" ") ?? "";
      const matchesSearch =
        !term ||
        `${offer.title} ${offer.subtitle} ${offer.description} ${itemsText} ${offer.category}`
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesSearch;
    });

    return filtered.toSorted((a, b) => {
      if (sort === "savings") {
        const savingsA = a.originalPrice - a.discountedPrice;
        const savingsB = b.originalPrice - b.discountedPrice;
        return savingsB - savingsA;
      }
      if (sort === "price-low") return a.discountedPrice - b.discountedPrice;
      if (sort === "price-high") return b.discountedPrice - a.discountedPrice;
      // "featured" default
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [category, query, sort]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setSort("featured");
  }

  return (
    <section id="all-offers" aria-labelledby="all-offers-heading" className="scroll-mt-20">
      <OffersToolbar
        query={query}
        category={category}
        sort={sort}
        categories={offerFilters}
        counts={counts}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />

      <div className="site-shell px-4 pt-2 pb-2 sm:px-6 sm:pt-4 sm:pb-3 lg:px-8 lg:pt-8 2xl:px-10">
        <div className="lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:items-start lg:gap-5 xl:grid-cols-[230px_minmax(0,1fr)] xl:gap-6">
          <OffersSidebar
            query={query}
            category={category}
            sort={sort}
            categories={offerFilters}
            counts={counts}
            onQueryChange={setQuery}
            onCategoryChange={setCategory}
            onSortChange={setSort}
          />

          <div className="min-w-0">
            <div className="mb-2.5 sm:mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
              <div>
                <h2
                  id="all-offers-heading"
                  className="text-xl font-extrabold tracking-tight text-dark sm:text-3xl"
                >
                  {category === "all"
                    ? "Choose your deal"
                    : offerFilters.find((f) => f.id === category)?.label}
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-muted">
                  Clear prices, generous portions and no hidden charges.
                </p>
              </div>
              <p className="shrink-0 text-xs sm:text-sm font-semibold text-secondary" role="status">
                {offers.length} {offers.length === 1 ? "offer" : "offers"} available
              </p>
            </div>

            {offers.length > 0 ? (
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={`${category}-${sort}-${query.trim()}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4.5"
                >
                  {offers.map((offer, index) => (
                    <m.div
                      key={offer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index, 5) * 0.045 }}
                    >
                      <OfferCard offer={offer} />
                    </m.div>
                  ))}
                </m.div>
              </AnimatePresence>
            ) : (
              <div className="rounded-3xl border border-border bg-surface px-6 py-16 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Icon name="search" className="size-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-dark">No offers found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                  Try another search or clear the filters to view all promotional packages.
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

            <p className="mt-5 text-center text-xs leading-relaxed text-muted">
              Offers are subject to availability and cannot be combined with another promotion.
              Restaurant terms apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
