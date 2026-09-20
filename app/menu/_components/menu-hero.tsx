import { InteriorPageHero } from "@/app/_components/interior-page-hero";
import { rannaGhorConfig } from "@/app/_data/restaurant";
import { restaurantImages } from "@/app/_data/imagery";
import { Icon } from "@/app/_ui/icon";

export function MenuHero() {
  const { delivery } = rannaGhorConfig;

  return (
    <InteriorPageHero
      labelledBy="menu-heading"
      image={restaurantImages.hero}
      imageAlt="A freshly prepared chicken biryani feast"
      imagePosition="68% center"
    >
      <h1 id="menu-heading" className="text-4xl font-extrabold tracking-tight text-dark sm:text-5xl">
        Find your favourite
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
        From comforting biryani to smoky grills and chilled drinks—clear prices, quick ordering and plenty to love.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 font-semibold text-secondary shadow-2xs">
          <Icon name="check" className="size-4" /> {delivery.isOpen ? "Open now" : "Closed"}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 font-semibold text-dark shadow-2xs">
          <Icon name="delivery" className="size-4 text-primary" /> {delivery.averageTime}
        </span>
      </div>
    </InteriorPageHero>
  );
}
