import Link from "next/link";
import { InteriorPageHero } from "@/app/_components/interior-page-hero";
import { restaurantImages } from "@/app/_data/imagery";
import { Icon } from "@/app/_ui/icon";

export function OffersHero() {
  return (
    <InteriorPageHero
      labelledBy="offers-page-heading"
      image={restaurantImages.familyFeastBanner}
      imageAlt="A table filled with biryani, grilled chicken and drinks"
      imagePosition="66% center"
    >
      <h1 id="offers-page-heading" className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
        More flavour. <span className="text-primary">Better value.</span>
      </h1>
      <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-dark/80 sm:text-base">
        Save on family feasts, quick lunches and combos made for sharing. Every deal shows exactly what you get and what you save.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <Link href="#all-offers" className="section-action section-action-compact bg-primary px-4 text-white hover:bg-primary-hover">
          Browse offers <Icon name="arrow" className="size-4" />
        </Link>
        <Link href="/menu" className="section-action section-action-compact border border-border bg-surface px-4 text-dark hover:bg-stone-50">
          View full menu
        </Link>
      </div>
    </InteriorPageHero>
  );
}
