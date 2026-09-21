"use client";

import { Icon } from "@/app/_ui/icon";

import Image from "next/image";
import * as m from "motion/react-m";
import { Product } from "@/app/_types/product";
import { useCart } from "@/app/_components/cart-context";

interface MenuExploreCardProps {
  item: Product;
}

export function MenuExploreCard({ item }: MenuExploreCardProps) {
  const { addToCart } = useCart();

  return (
    <m.div
      whileHover={{ y: -3 }}
      className="flex items-center gap-3 bg-white border border-[#EAE5E1] rounded-2xl p-2.5 sm:p-3 shadow-2xs hover:shadow-md hover:border-[#E8572A]/30 transition-[border-color,box-shadow]"
    >
      {/* Food Photo */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info & Price/Add */}
      <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-0.5">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#1D2522] truncate tracking-tight">
            {item.name}
          </h4>
          <p className="mt-0.5 line-clamp-1 text-[11px] font-medium text-muted-strong sm:text-xs">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 pt-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-base font-extrabold text-dark sm:text-lg">৳{item.price}</span>
            {item.oldPrice && (
              <span className="text-xs font-medium text-muted line-through decoration-2">৳{item.oldPrice}</span>
            )}
          </div>

          <m.button
            onClick={() => addToCart(item)}
            whileTap={{ scale: 0.9 }}
            aria-label={`Add ${item.name} to cart for ৳${item.price}`}
            className="flex size-9 items-center justify-center rounded-xl bg-primary text-white shadow-2xs transition-all hover:bg-primary-hover active:scale-95"
          >
            <Icon name="plus" />
          </m.button>
        </div>
      </div>
    </m.div>
  );
}
