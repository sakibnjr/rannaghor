"use client";

import { Icon } from "@/app/_ui/icon";

import Link from "next/link";
import { useMenuFilter } from "./menu-filter-provider";
import { popularProducts } from "@/app/_data/products";
import { exploreCategories, exploreMenuItems } from "@/app/_data/explore-menu";
import { MenuExploreCard } from "./menu-explore-card";

export function MenuExploreSection() {
  const { category: activeTab, selectCategory: setActiveTab } = useMenuFilter();
  const menuItems = [...exploreMenuItems, ...popularProducts];
  const displayItems = activeTab === "Popular"
    ? exploreMenuItems.slice(0, 6)
    : menuItems.filter((item) =>
        item.categoryId.toLowerCase().replace(/^cat-/, "") === activeTab.toLowerCase()
      );

  return (
    <section id="explore-menu" aria-labelledby="explore-heading" className="w-full">
      {/* Section Header & Filter Tabs */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h2
            id="explore-heading"
            tabIndex={-1}
            className="text-2xl sm:text-3xl font-bold text-[#1D2522] tracking-tight"
          >
            Explore Our Menu
          </h2>
          <p className="text-xs sm:text-sm text-[#6B706D] mt-1">
            A world of flavors, just for you.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {exploreCategories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                aria-pressed={isActive}
                className={`min-h-11 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#E8572A] text-white shadow-xs"
                    : "bg-stone-100 text-[#1D2522] hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" role="status">{displayItems.length} dishes in {activeTab}</p>
      {/* Filtered menu preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {displayItems.map((item) => (
          <MenuExploreCard key={item.id} item={item} />
        ))}
      </div>

      {/* Bottom View Full Menu CTA */}
      <div className="flex justify-center mt-8">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-white border border-[#E8572A] text-[#E8572A] hover:bg-orange-50/50 text-sm font-semibold px-6 py-2.5 rounded-full shadow-2xs transition-all active:scale-98"
        >
          <span>View Full Menu</span>
          <Icon name="arrow" className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
