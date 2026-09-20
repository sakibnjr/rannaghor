import Link from "next/link";
import { InteriorPageHero } from "@/app/_components/interior-page-hero";
import { restaurantImages } from "@/app/_data/imagery";
import { Icon } from "@/app/_ui/icon";

export function GalleryHero() {
  return (
    <InteriorPageHero
      labelledBy="gallery-page-heading"
      image={restaurantImages.galleryBiryani}
      imageAlt="Traditional RannaGhor biryani served at the restaurant"
      imagePosition="68% center"
    >
      <h1 id="gallery-page-heading" className="text-4xl font-extrabold tracking-tight text-dark sm:text-5xl">
        A glimpse inside RannaGhor.
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
        From biryani leaving the kitchen to evenings shared around the table, these are the moments that make our restaurant feel like home.
      </p>
      <Link href="/menu" className="section-action mt-6 w-fit bg-primary px-6 text-white hover:bg-primary-hover">
        Explore the menu <Icon name="arrow" className="size-4" />
      </Link>
    </InteriorPageHero>
  );
}
