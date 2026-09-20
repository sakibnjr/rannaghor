"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { offerCampaigns, offerFilters } from "../_data/offer-campaigns";
import type { OfferFilter } from "../_types/offer";
import { OfferCard } from "./offer-card";

export function OffersBrowser() {
  const [activeFilter, setActiveFilter] = useState<OfferFilter>("all");
  const offers = useMemo(
    () => activeFilter === "all" ? offerCampaigns : offerCampaigns.filter((offer) => offer.category === activeFilter),
    [activeFilter],
  );

  return (
    <section id="all-offers" aria-labelledby="all-offers-heading" className="page-section scroll-mt-24">
      <div className="site-shell px-4 sm:px-6 lg:px-8 2xl:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 id="all-offers-heading" className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">Choose your deal</h2>
            <p className="mt-2 text-sm text-muted">Clear prices, generous portions and no hidden charges.</p>
          </div>
          <p className="text-sm font-semibold text-secondary" role="status">{offers.length} {offers.length === 1 ? "offer" : "offers"} available</p>
        </div>

        <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter offers">
          {offerFilters.map((filter) => {
            const count = filter.id === "all" ? offerCampaigns.length : offerCampaigns.filter((offer) => offer.category === filter.id).length;
            const selected = filter.id === activeFilter;
            return (
              <m.button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveFilter(filter.id)}
                animate={{ scale: selected ? 1.025 : 1 }}
                whileTap={{ scale: 0.96 }}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold transition-colors ${selected ? "border-primary bg-primary text-white" : "border-border bg-surface text-dark hover:border-primary hover:text-primary"}`}
              >
                {filter.label} <span className={selected ? "text-white/80" : "text-muted"}>({count})</span>
              </m.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={activeFilter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {offers.map((offer, index) => (
              <m.div
                key={offer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index, 5) * 0.045 }}
                className={offer.featured ? "md:col-span-2 xl:col-span-3" : undefined}
              >
                <OfferCard offer={offer} />
              </m.div>
            ))}
          </m.div>
        </AnimatePresence>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted">
          Offers are subject to availability and cannot be combined with another promotion. Restaurant terms apply.
        </p>
      </div>
    </section>
  );
}
