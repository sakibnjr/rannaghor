import { Icon } from "@/app/_ui/icon";
import Link from "next/link";
import { featuredOffer, promoOffers } from "@/app/_data/offers";
import { FeaturedOfferCard } from "./featured-offer-card";
import { PromoOfferCard } from "./promo-offer-card";

export function OffersSection() {
  return (
    <section aria-labelledby="offers-heading" className="w-full">
      {/* Header Row */}
      <div className="flex items-end justify-between gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <h2
            id="offers-heading"
            className="text-2xl sm:text-3xl font-bold text-[#1D2522] tracking-tight"
          >
            Special Offers
          </h2>
          <span className="text-xs font-medium text-muted-strong sm:text-sm">
            Great food. Greater savings.
          </span>
        </div>

        <Link
          href="/offers"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#E8572A] hover:text-[#D24519] transition-colors group"
        >
          <span>View all offers</span>
          <Icon name="arrow" className="size-3.5" />
        </Link>
      </div>

      {/* Offers Layout: Large Left (Family Feast) + 2 Stacked Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="flex h-full flex-col lg:col-span-7">
          <FeaturedOfferCard offer={featuredOffer} />
        </div>

        <div className="flex h-full flex-col justify-between gap-3 lg:col-span-5">
          {promoOffers.map((promo) => (
            <PromoOfferCard key={promo.id} offer={promo} />
          ))}
        </div>
      </div>
    </section>
  );
}
