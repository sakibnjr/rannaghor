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
      <h1 id="about-page-heading" className="text-4xl font-extrabold tracking-tight text-dark sm:text-5xl">
        Rooted in Bangladesh. Made for today.
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
        Familiar Bangladeshi food, prepared carefully and served warmly, can turn an ordinary meal into time well spent.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/menu" className="section-action bg-primary px-6 text-white hover:bg-primary-hover">
          Explore our menu <Icon name="arrow" className="size-4" />
        </Link>
        <Link href="/contact" className="section-action border border-border bg-white px-6 text-dark hover:bg-stone-50">
          Visit us
        </Link>
      </div>
    </InteriorPageHero>
  );
}
