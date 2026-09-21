import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/app/_ui/icon";
import { aboutImages } from "../_data/about-content";

export function AboutCta() {
  return (
    <section className="site-shell py-10 sm:py-12" aria-labelledby="about-cta-heading">
      <div className="grid overflow-hidden rounded-2xl border border-clay-border bg-clay text-dark md:grid-cols-[1fr_0.72fr]">
        <div className="px-5 py-7 sm:px-8"><h2 id="about-cta-heading" className="text-2xl font-extrabold tracking-tight sm:text-3xl">Your next favourite meal is waiting.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-muted">Explore our biryani, grills, burgers and restaurant favourites, all with clear prices and quick ordering.</p><Link href="/menu" className="section-action section-action-compact mt-5 bg-primary px-5 text-white hover:bg-primary-hover">View full menu <Icon name="arrow" className="size-4" /></Link></div>
        <div className="relative min-h-[220px]"><Image src={aboutImages.food} alt="RannaGhor biryani ready to serve" fill sizes="(max-width: 767px) 100vw, 40vw" className="object-cover" /></div>
      </div>
    </section>
  );
}
