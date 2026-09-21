import Link from "next/link";
import { InteriorPageHero } from "@/app/_components/interior-page-hero";
import { Icon } from "@/app/_ui/icon";
import { aboutImages } from "../_data/about-content";

export function AboutHero() {
  return (
    <InteriorPageHero
      labelledBy="about-page-heading"
      image={aboutImages.hero}
      imageAlt="A RannaGhor chef carefully preparing a dish"
      imagePosition="72% center"
    >
      <h1 id="about-page-heading" className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
        Rooted in Bangladesh. Made for today.
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-6 text-muted sm:text-base">
        Familiar Bangladeshi food, prepared carefully and served warmly, can turn an ordinary meal into time well spent.
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <Link href="/menu" className="section-action section-action-compact bg-primary px-5 text-white hover:bg-primary-hover">
          Explore our menu <Icon name="arrow" className="size-4" />
        </Link>
        <Link href="/contact" className="section-action section-action-compact border border-border bg-white px-5 text-dark hover:bg-stone-50">
          Visit us
        </Link>
      </div>
    </InteriorPageHero>
  );
}
