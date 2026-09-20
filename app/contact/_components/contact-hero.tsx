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
      <h1 id="contact-page-heading" className="text-4xl font-extrabold tracking-tight text-dark sm:text-5xl">
        Let’s talk about your next meal.
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
        Ask about the menu, delivery, a recent order or visiting our Dhanmondi restaurant. We will point you in the right direction.
      </p>
      <a href={`tel:${locationData.phone.replace(/\s+/g, "")}`} className="section-action mt-6 bg-primary px-6 text-white hover:bg-primary-hover">
        <Icon name="phone" className="size-4" /> Call {locationData.displayPhone}
      </a>
    </InteriorPageHero>
  );
}
