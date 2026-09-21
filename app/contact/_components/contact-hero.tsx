import { InteriorPageHero } from "@/app/_components/interior-page-hero";
import { restaurantImages } from "@/app/_data/imagery";
import { locationData } from "@/app/_data/location";
import { Icon } from "@/app/_ui/icon";

export function ContactHero() {
  return (
    <InteriorPageHero
      labelledBy="contact-page-heading"
      image={restaurantImages.galleryInterior}
      imageAlt="The welcoming interior at RannaGhor"
      imagePosition="70% center"
    >
      <h1 id="contact-page-heading" className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
        Let’s talk about your next meal.
      </h1>
      <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-dark/80 sm:text-base">
        Ask about the menu, delivery, a recent order or visiting our Dhanmondi restaurant. We will point you in the right direction.
      </p>
      <a href={`tel:${locationData.phone.replace(/\s+/g, "")}`} className="section-action section-action-compact mt-5 bg-primary px-5 text-white hover:bg-primary-hover">
        <Icon name="phone" className="size-4" /> Call {locationData.displayPhone}
      </a>
    </InteriorPageHero>
  );
}
