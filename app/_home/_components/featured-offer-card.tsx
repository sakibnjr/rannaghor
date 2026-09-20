"use client";

import { Icon } from "@/app/_ui/icon";

import Image from "next/image";
import { SpecialOffer } from "@/app/_types/offer";
import { useCart } from "@/app/_components/cart-context";

interface FeaturedOfferCardProps {
  offer: SpecialOffer;
}

export function FeaturedOfferCard({ offer }: FeaturedOfferCardProps) {
  const { addToCart } = useCart();

  const handleOrder = () => {
    addToCart({
      id: offer.id,
      name: offer.title,
      slug: "family-feast",
      description: offer.subtitle,
      image: offer.image,
      price: offer.discountedPrice,
      oldPrice: offer.originalPrice,
      rating: 4.9,
      reviewCount: 380,
      categoryId: "offers",
      available: true,
    });
  };

  return (
    <div className="relative h-full w-full min-h-[300px] flex-1 overflow-hidden rounded-3xl border border-[#EAE2D2] bg-[#FAF3E8] shadow-2xs transition-shadow hover:shadow-md sm:min-h-[320px] sm:flex-row">
      <div className="relative order-2 h-56 w-full sm:absolute sm:inset-y-0 sm:right-0 sm:h-full sm:w-[48%]">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 380px"
          className="object-cover"
        />
      </div>

      {/* Scalloped Octagonal Green Savings Badge */}
      <div
        className="absolute top-4 sm:top-5 right-4 sm:right-auto sm:left-[45%] z-20 w-14 h-14 sm:w-16 sm:h-16 bg-[#16603F] text-white flex flex-col items-center justify-center text-center shadow-lg transform -rotate-6 select-none"
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
      >
        <span className="text-[10px] sm:text-[11px] font-medium leading-none">Save</span>
        <span className="text-xs sm:text-sm font-extrabold leading-tight mt-0.5">৳ {offer.originalPrice - offer.discountedPrice}</span>
      </div>

      {/* Left Content Column */}
      <div className="relative z-10 flex h-full min-h-[300px] w-full flex-col items-start gap-2.5 p-6 sm:min-h-[320px] sm:w-[50%] sm:p-7">
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#C02615] leading-tight">
          {offer.title}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-[#443831] leading-tight">
          {offer.subtitle}
        </p>

        {/* Itemized checklist */}
        {offer.items && (
          <ul className="space-y-0.5 my-1 text-xs sm:text-[13px] text-[#3D352F] font-normal">
            {offer.items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="text-stone-700 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-3">
          {/* Price Row */}
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium text-stone-400 line-through sm:text-sm">
              ৳ {offer.originalPrice?.toLocaleString()}
            </span>
            <span className="text-xl font-black text-primary sm:text-2xl">
              ৳ {offer.discountedPrice}
            </span>
          </div>

          {/* Order Now CTA Button */}
          <button
            onClick={handleOrder}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-primary-hover active:scale-98 sm:text-sm"
          >
            <span>Order Now</span>
            <Icon name="arrow" className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
