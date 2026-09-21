import { Icon } from "@/app/_ui/icon";
import Link from "next/link";
import { popularProducts } from "@/app/_data/products";
import { FoodProductCard } from "@/app/_components/food-product-card";

export function PopularSection() {
  return (
    <section aria-labelledby="popular-heading" className="w-full">
      {/* Header Row */}
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2
            id="popular-heading"
            className="text-2xl sm:text-3xl font-bold text-[#1D2522] tracking-tight"
          >
            Popular Right Now
          </h2>
          <p className="text-xs sm:text-sm text-[#6B706D] mt-1">
            Most loved dishes by our customers
          </p>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#E8572A] hover:text-[#D24519] transition-colors group"
        >
          <span>View all</span>
          <Icon name="arrow" className="size-3.5" />
        </Link>
      </div>

      {/* 4-Item Product Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {popularProducts.map((product) => (
          <FoodProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
