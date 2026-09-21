"use client";

import { useEffect, useRef, useState } from "react";
import { foodCategories } from "@/app/_data/categories";
import { Icon } from "@/app/_ui/icon";
import { CategoryCard } from "./category-card";
import { useMenuFilter } from "./menu-filter-provider";
import styles from "./home-sections.module.css";

export function CategorySection() {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const { category, selectCategory } = useMenuFilter();

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => setEdges({
      start: element.scrollLeft <= 2,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
    });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  function scroll(direction: number) {
    rail.current?.scrollBy({ left: direction * 336, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function choose(name: string) {
    selectCategory(name);
    document.getElementById("explore-heading")?.focus({ preventScroll: true });
    document.getElementById("explore-menu")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  }

  return (
    <section aria-labelledby="categories-heading">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 id="categories-heading" className="text-2xl font-bold tracking-tight text-dark sm:text-3xl">Food Categories</h2>
          <p className="mt-1 text-sm text-muted">Find what you’re craving.</p>
        </div>
        <div className="flex gap-2 lg:hidden">
          <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Previous categories" aria-controls="category-list" className="category-scroll-button"><Icon name="left" className="size-4" /></button>
          <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="Next categories" aria-controls="category-list" className="category-scroll-button"><Icon name="right" className="size-4" /></button>
        </div>
      </div>
      <div id="category-list" ref={rail} className={styles.categoryRail}>
        {foodCategories.map((item) => <CategoryCard key={item.id} category={item} selected={category === item.name} onSelect={() => choose(item.name)} />)}
      </div>
    </section>
  );
}
