import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/app/_ui/icon";
import { aboutImages } from "../_data/about-content";

export function AboutCta() {
  return (
    <section className="site-shell page-section" aria-labelledby="about-cta-heading">
      <div className="grid overflow-hidden rounded-3xl border border-clay-border bg-clay text-dark md:grid-cols-[1fr_0.72fr]">
        <div className="px-6 py-10 sm:px-10"><h2 id="about-cta-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">Your next favourite meal is waiting.</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">Explore our biryani, grills, burgers and restaurant favourites, all with clear prices and quick ordering.</p><Link href="/menu" className="section-action mt-6 bg-primary px-6 text-white hover:bg-primary-hover">View full menu <Icon name="arrow" className="size-4" /></Link></div>
        <div className="relative min-h-[260px]"><Image src={aboutImages.food} alt="RannaGhor biryani ready to serve" fill sizes="(max-width: 767px) 100vw, 40vw" className="object-cover" /></div>
      </div>
    </section>
  );
}
