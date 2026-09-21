"use client";

import { Icon } from "@/app/_ui/icon";

import Image from "next/image";
import Link from "next/link";
import { SpecialOffer } from "@/app/_types/offer";
import { useCart } from "@/app/_components/cart-context";

interface PromoOfferCardProps {
  offer: SpecialOffer;
}

export function PromoOfferCard({ offer }: PromoOfferCardProps) {
  const { addToCart } = useCart();
  const slug = offer.id.replace(/^offer-/, "");

  const handleOrder = () => {
    addToCart({
      id: offer.id,
      name: offer.title,
      slug: slug,
      description: offer.subtitle,
      image: offer.image,
      price: offer.discountedPrice,
      oldPrice: offer.originalPrice,
      rating: 4.8,
      reviewCount: 220,
      categoryId: "offers",
      available: true,
    });
  };

  return (
    <div className="relative flex items-center justify-between bg-[#FDFBF7] border border-[#EAE3D4] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-shadow gap-4 overflow-hidden min-h-[148px]">
      {/* Scalloped Octagonal Green Savings Badge at Top Right */}
      <div
        className="absolute top-3 right-3 z-10 w-12 h-12 bg-[#16603F] text-white flex flex-col items-center justify-center text-center shadow-md select-none"
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
      >
        <span className="text-[9.5px] font-medium leading-none">Save</span>
        <span className="text-xs font-extrabold leading-tight mt-0.5">
          {offer.savingsBadge.replace("Save ", "")}
        </span>
      </div>

      {/* Left Details */}
      <div className="flex flex-col items-start gap-1 z-10 flex-1">
        <h4 className="text-base sm:text-lg font-black text-[#C02615] tracking-tight">
          <Link href={`/offers/${slug}`} className="hover:underline">
            {offer.title}
          </Link>
        </h4>
        <p className="text-[11px] sm:text-xs text-[#6B706D] line-clamp-1">
          {offer.subtitle}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xs line-through text-stone-400 font-medium">
            ৳ {offer.originalPrice}
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#1D2522]">
            ৳ {offer.discountedPrice}
          </span>
        </div>

        {/* Order Now CTA */}
        <button
          onClick={handleOrder}
          className="mt-1 inline-flex items-center gap-1.5 bg-[#E8572A] hover:bg-[#D24519] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-2xs active:scale-95 transition-all cursor-pointer"
        >
          <span>Order Now</span>
          <Icon name="arrow" className="size-3.5" />
        </button>
      </div>

      {/* Right Dish Image */}
      <Link
        href={`/offers/${slug}`}
        className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-2xs flex-shrink-0 block"
        aria-label={`View ${offer.title} details`}
      >
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="128px"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
    </div>
  );
}
