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
  return (
    <div className="sticky top-16 z-30 border-b border-border bg-brand-bg/95 py-3 backdrop-blur-md sm:top-[70px]">
      <div className="site-shell">
        <div className="rounded-2xl border border-border bg-white p-2.5 shadow-2xs sm:p-3">
          <div className="grid gap-2.5 lg:grid-cols-[minmax(0,1fr)_220px_160px]">
            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-brand-bg px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <Icon name="search" className="size-4.5 text-muted" />
              <span className="sr-only">Search the menu</span>
              <input
                type="search"
                value={props.query}
                onChange={(event) => props.onQueryChange(event.target.value)}
                placeholder="Search dishes, categories or ingredients"
                className="w-full bg-transparent text-sm text-dark outline-none placeholder:text-muted"
              />
            </label>

            <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-brand-bg px-3.5 text-sm focus-within:border-primary">
              <span className="shrink-0 text-xs font-semibold text-muted">Sort by</span>
              <select
                aria-label="Sort dishes"
                value={props.sort}
                onChange={(event) => props.onSortChange(event.target.value as MenuSort)}
                className="min-w-0 flex-1 bg-transparent font-bold text-dark outline-none"
              >
                <option value="popular">Most popular</option>
                <option value="rating">Top rated</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>

            <m.button
              type="button"
              aria-pressed={props.availableOnly}
              onClick={() => props.onAvailabilityChange(!props.availableOnly)}
              animate={{ scale: props.availableOnly ? 1.015 : 1 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-4 text-sm font-bold transition-colors ${
                props.availableOnly
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-brand-bg text-dark hover:border-primary hover:text-primary"
              }`}
            >
              <Icon name="check" className="size-3.5" /> Available now
            </m.button>
          </div>

          <div
            className="no-scrollbar mt-2.5 flex gap-2 overflow-x-auto lg:grid lg:grid-flow-col lg:auto-cols-fr lg:overflow-visible"
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
                  className={`min-h-10 shrink-0 whitespace-nowrap rounded-xl px-3 text-xs font-bold transition-colors lg:min-w-0 lg:px-2 ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "border border-border bg-white text-dark hover:border-primary hover:text-primary"
                  }`}
                >
                  {item.label}{" "}
                  <span className={active ? "text-white/75" : "text-muted"}>
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
