"use client";

import { Icon } from "@/app/_ui/icon";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useMenuFilter } from "./menu-filter-provider";
import { exploreCategories } from "@/app/_data/explore-menu";
import { menuProducts, normalizeCategory } from "@/app/menu/_data/menu-products";
import { MenuExploreCard } from "./menu-explore-card";

export function MenuExploreSection() {
  const { category: activeTab, selectCategory: setActiveTab } = useMenuFilter();
  const normalizedActiveTab = normalizeCategory(activeTab);

  const displayItems = activeTab === "Popular"
    ? menuProducts.filter((item) => item.bestseller || item.rating >= 4.8).slice(0, 6)
    : menuProducts
        .filter((item) => normalizeCategory(item.categoryId) === normalizedActiveTab)
        .slice(0, 6);

  return (
    <section id="explore-menu" aria-labelledby="explore-heading" className="w-full">
      {/* Section Header & Filter Tabs */}
      <div className="flex flex-col gap-3 mb-4">
        <div>
          <h2
            id="explore-heading"
            tabIndex={-1}
            className="text-2xl sm:text-3xl font-bold text-[#1D2522] tracking-tight"
          >
            Explore Our Menu
          </h2>
          <p className="mt-1 text-xs font-medium text-muted-strong sm:text-sm">
            A world of flavors, just for you.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {exploreCategories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <m.button
                key={cat}
                onClick={() => setActiveTab(cat)}
                aria-pressed={isActive}
                animate={{ scale: isActive ? 1.025 : 1 }}
                whileTap={{ scale: 0.96 }}
                className={`min-h-8 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#E8572A] text-white shadow-xs"
                    : "bg-stone-100 text-[#1D2522] hover:bg-stone-200"
                }`}
              >
                {cat}
              </m.button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" role="status">{displayItems.length} dishes in {activeTab}</p>
      {/* Filtered menu preview */}
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayItems.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <MenuExploreCard item={item} />
            </m.div>
          ))}
        </m.div>
      </AnimatePresence>

      {/* Bottom View Full Menu CTA */}
      <div className="flex justify-center mt-4 sm:mt-5">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-white border border-[#E8572A] text-[#E8572A] hover:bg-orange-50/50 text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-2xs transition-all active:scale-98"
        >
          <span>View Full Menu</span>
          <Icon name="arrow" className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
