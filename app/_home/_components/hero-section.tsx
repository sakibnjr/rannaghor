"use client";

import { Icon } from "@/app/_ui/icon";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { rannaGhorConfig } from "@/app/_data/restaurant";
import { heroSlides } from "../_data/hero-slides";
import { HeroTrustBar } from "./hero-trust-bar";
import { HeroFloatingElements } from "./hero-floating-elements";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const slide = heroSlides[activeIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % heroSlides.length);
  }, []);

  function handleSwipeStart(event: ReactPointerEvent<HTMLElement>) {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    if ((event.target as HTMLElement).closest("a, button, input, textarea, select")) return;

    swipeStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsPaused(true);
  }

  function handleSwipeEnd(event: ReactPointerEvent<HTMLElement>) {
    if (swipeStartX.current === null) return;

    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(distance) >= 45) {
      if (distance < 0) handleNext();
      else handlePrev();
    }
    setIsPaused(false);
  }

  function handleSwipeCancel(event: ReactPointerEvent<HTMLElement>) {
    swipeStartX.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsPaused(false);
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || isPaused) return;
    const timer = window.setInterval(handleNext, 4500);
    return () => window.clearInterval(timer);
  }, [reducedMotion, isPaused, handleNext, activeIndex]);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          MOBILE HERO (Layout 1: App Banner Slider - Foodpanda/Swiggy Style)
          Visible on screens below 1024px
      ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="mobile-hero-heading"
        aria-roledescription="carousel"
        aria-label="Featured meals and offers"
        className="site-shell cursor-grab touch-pan-y px-3 pb-0 pt-3 active:cursor-grabbing lg:hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={handleSwipeStart}
        onPointerUp={handleSwipeEnd}
        onPointerCancel={handleSwipeCancel}
      >
        {/* Banner Card Container */}
        <div className="relative h-[270px] xs:h-[285px] sm:h-[320px] w-full overflow-hidden rounded-2xl border border-border/50 bg-dark shadow-md">
          {/* Background Images */}
          {heroSlides.map((item, index) => (
            <m.div
              key={item.id}
              aria-hidden={index !== activeIndex}
              animate={{ opacity: index === activeIndex ? 1 : 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              <Image
                src={item.image.src}
                alt={index === activeIndex ? item.image.alt : ""}
                fill
                draggable={false}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Rich gradient for clear text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/55 to-dark/25" />
            </m.div>
          ))}

          {/* Top Row: Badge & Rating */}
          <div className="absolute left-3 right-3 top-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            <span className="truncate rounded-full bg-primary/95 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm backdrop-blur-xs">
              {slide.badge}
            </span>
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-extrabold text-dark shadow-sm backdrop-blur-xs">
              {slide.highlight.value}
              {slide.highlight.showStar && <Icon name="star" className="size-3 text-rating inline" />}
            </span>
          </div>

          {/* Left / Right Quick Navigation Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center text-white drop-shadow-md transition hover:text-primary active:scale-90"
          >
            <Icon name="left" className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center text-white drop-shadow-md transition hover:text-primary active:scale-90"
          >
            <Icon name="right" className="size-4" />
          </button>

          {/* Bottom Content Area */}
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={slide.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
              className="absolute inset-x-0 bottom-8 z-10 px-4 flex flex-col items-start"
            >
              <h1 id="mobile-hero-heading" className="text-xl font-extrabold tracking-tight text-white leading-tight">
                {slide.headline.line1}{" "}
                <span className="text-primary">{slide.headline.line2}</span>
              </h1>
              <p className="mt-1 line-clamp-1 max-w-[85%] text-xs text-white/80 leading-normal">
                {slide.description}
              </p>

              <div className="mt-2.5 flex items-center gap-2">
                <Link
                  href={slide.primaryAction.href}
                  className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-bold text-white shadow-md hover:bg-primary-hover active:scale-95 transition"
                >
                  {slide.primaryAction.label} <Icon name="arrow" className="size-3" />
                </Link>
                <Link
                  href={slide.secondaryAction.href}
                  className="inline-flex min-h-8 items-center rounded-full bg-white/20 border border-white/30 px-3 text-xs font-semibold text-white backdrop-blur-xs hover:bg-white/30 active:scale-95 transition"
                >
                  {slide.secondaryAction.label}
                </Link>
              </div>
            </m.div>
          </AnimatePresence>

          {/* Mobile Pagination Dots (Generous touch target for reliable tapping) */}
          <div
            className="absolute bottom-1.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-dark/50 px-2 py-0.5 backdrop-blur-md"
            role="tablist"
            aria-label="Hero carousel pagination"
          >
            {heroSlides.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}: ${item.badge}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(index);
                  }}
                  className="flex items-center justify-center p-1.5 cursor-pointer touch-manipulation"
                >
                  <span
                    className={`block h-1.5 transition-all duration-300 ${
                      isActive
                        ? "w-5 rounded-full bg-primary"
                        : "size-1.5 rounded-full bg-white/60 hover:bg-white"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Trust Bar beneath the hero card */}
        <HeroTrustBar delivery={rannaGhorConfig.delivery} />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DESKTOP HERO (Side-by-side rich photography layout)
          Visible on screens 1024px and up
      ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="desktop-hero-heading"
        aria-roledescription="carousel"
        aria-label="Featured meals and offers"
        className="hero-section group relative hidden cursor-grab touch-pan-y select-none active:cursor-grabbing lg:block"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={handleSwipeStart}
        onPointerUp={handleSwipeEnd}
        onPointerCancel={handleSwipeCancel}
      >
        {/* Desktop Left Slider Arrow (Visible on hover) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="pointer-events-auto absolute left-4 top-1/2 z-30 flex size-12 -translate-y-1/2 items-center justify-center text-white opacity-0 drop-shadow-lg transition-all duration-300 hover:scale-110 hover:text-primary active:scale-95 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white group-hover:opacity-100 lg:left-6"
        >
          <Icon name="left" className="size-6" />
        </button>

        {/* Desktop Right Slider Arrow (Visible on hover) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="pointer-events-auto absolute right-4 top-1/2 z-30 flex size-12 -translate-y-1/2 items-center justify-center text-white opacity-0 drop-shadow-lg transition-all duration-300 hover:scale-110 hover:text-primary active:scale-95 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white group-hover:opacity-100 lg:right-6"
        >
          <Icon name="right" className="size-6" />
        </button>

        {/* Desktop Pagination Dots */}
        <div
          className="pointer-events-auto absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/15 bg-dark/40 px-2 py-1 shadow-xl backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100 focus-within:opacity-100"
          role="tablist"
          aria-label="Hero carousel pagination"
        >
          {heroSlides.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}: ${item.badge}`}
                onClick={() => setActiveIndex(index)}
                className="group/dot flex size-5 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 group-hover/dot:bg-white ${
                    isActive ? "w-5 bg-primary" : "w-1.5 bg-white/50"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Desktop Content Left Column */}
        <div className="hero-content">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={slide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32 }}
              className="hero-copy"
              role="group"
              aria-roledescription="slide"
              aria-label={`${activeIndex + 1} of ${heroSlides.length}`}
            >
              <p className="text-sm font-semibold text-primary">{slide.badge}</p>
              <h1 id="desktop-hero-heading" className="hero-heading">
                {slide.headline.line1}
                <span className="block text-primary">{slide.headline.line2}</span>
              </h1>
              <p className="max-w-[390px] text-base font-medium leading-relaxed text-muted-strong">
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
            </m.div>
          </AnimatePresence>
        </div>

        {/* Desktop Visual Right Column */}
        <div className="hero-visual">
          {heroSlides.map((item, index) => (
            <m.div
              key={item.id}
              aria-hidden={index !== activeIndex}
              animate={{ opacity: index === activeIndex ? 1 : 0 }}
              transition={{ duration: 0.55 }}
              className="hero-photo"
            >
              <Image
                src={item.image.src}
                alt={index === activeIndex ? item.image.alt : ""}
                fill
                draggable={false}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="100vw"
                className="hero-image object-cover"
              />
            </m.div>
          ))}

          <HeroFloatingElements highlight={slide.highlight} note={slide.note} />
        </div>
      </section>
    </>
  );
}
