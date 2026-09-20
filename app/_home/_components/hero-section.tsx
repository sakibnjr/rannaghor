"use client";

import { Icon } from "@/app/_ui/icon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { rannaGhorConfig } from "@/app/_data/restaurant";
import { heroSlides } from "../_data/hero-slides";
import { HeroTrustBar } from "./hero-trust-bar";
import { HeroFloatingElements } from "./hero-floating-elements";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slide = heroSlides[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % heroSlides.length),
      2000,
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      aria-label="Featured meals and offers"
      className="hero-section"
    >
      <div className="hero-content">
        <div key={slide.id} className="hero-copy hero-slide-copy" role="group" aria-roledescription="slide" aria-label={`${activeIndex + 1} of ${heroSlides.length}`}>
          <p className="text-sm font-semibold text-primary">{slide.badge}</p>
          <h1 id="hero-heading" className="hero-heading">
            {slide.headline.line1}
            <span className="block text-primary">{slide.headline.line2}</span>
          </h1>
          <p className="max-w-[390px] text-base leading-relaxed text-muted">
            {slide.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={slide.primaryAction.href} className="hero-button bg-primary text-white hover:bg-primary-hover">
              {slide.primaryAction.label} <Icon name="arrow" className="size-3.5" />
            </Link>
            <Link href={slide.secondaryAction.href} className="hero-button border border-border bg-surface text-dark hover:bg-primary-light">
              {slide.secondaryAction.label}
            </Link>
          </div>
          <HeroTrustBar delivery={rannaGhorConfig.delivery} />
        </div>
      </div>
      <div className="hero-visual">
        {heroSlides.map((item, index) => (
          <div key={item.id} aria-hidden={index !== activeIndex} className={`hero-photo transition-opacity duration-500 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}>
            <Image src={item.image.src} alt={index === activeIndex ? item.image.alt : ""} fill preload={index === 0} sizes="100vw" className="hero-image object-cover" />
          </div>
        ))}
        <HeroFloatingElements highlight={slide.highlight} note={slide.note} />
      </div>
    </section>
  );
}
