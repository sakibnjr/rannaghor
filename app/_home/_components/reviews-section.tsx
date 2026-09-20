"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { customerReviews, reviewsSummary } from "@/app/_data/reviews";
import { Icon } from "@/app/_ui/icon";
import { ReviewCard } from "./review-card";
import styles from "./home-sections.module.css";

export function ReviewsSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const metricsRef = useRef({ step: 1, visible: 1 });
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const goToPage = useCallback((page: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const nextPage = Math.max(0, Math.min(page, pageCount - 1));
    const { step, visible } = metricsRef.current;
    rail.scrollTo({ left: nextPage * step * visible, behavior: "smooth" });
    setActivePage(nextPage);
  }, [pageCount]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    function updateMetrics() {
      const firstCard = rail?.firstElementChild as HTMLElement | null;
      if (!rail || !firstCard) return;
      const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
      const step = firstCard.offsetWidth + gap;
      const visible = Math.max(1, Math.round((rail.clientWidth + gap) / step));
      metricsRef.current = { step, visible };
      setPageCount(Math.ceil(customerReviews.length / visible));
      setActivePage((page) => Math.min(page, Math.ceil(customerReviews.length / visible) - 1));
    }

    updateMetrics();
    const observer = new ResizeObserver(updateMetrics);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || pageCount < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActivePage((page) => {
        const nextPage = (page + 1) % pageCount;
        const { step, visible } = metricsRef.current;
        railRef.current?.scrollTo({ left: nextPage * step * visible, behavior: "smooth" });
        return nextPage;
      });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [pageCount, paused]);

  function updatePageFromScroll() {
    const rail = railRef.current;
    if (!rail || dragRef.current.active) return;
    const { step, visible } = metricsRef.current;
    setActivePage(Math.min(pageCount - 1, Math.max(0, Math.round(rail.scrollLeft / (step * visible)))));
  }

  function startDragging(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;
    dragRef.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
    setDragging(true);
    setPaused(true);
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (!rail || !dragRef.current.active) return;
    rail.scrollLeft = dragRef.current.startScroll - (event.clientX - dragRef.current.startX);
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (!rail || !dragRef.current.active) return;
    dragRef.current.active = false;
    rail.releasePointerCapture(event.pointerId);
    const { step, visible } = metricsRef.current;
    goToPage(Math.round(rail.scrollLeft / (step * visible)));
    setDragging(false);
    setPaused(false);
  }

  return (
    <section aria-labelledby="reviews-heading" className="w-full">
      <div className="mb-4">
        <h2 id="reviews-heading" className="text-2xl font-bold tracking-tight text-dark sm:text-3xl">
          Customer Reviews
        </h2>
        <p className="mt-1 text-sm text-muted">Real experiences from people who order with us.</p>
      </div>

      <div
        ref={railRef}
        className={`${styles.reviewRail} ${dragging ? styles.reviewRailDragging : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
        onScroll={updatePageFromScroll}
        onPointerDown={startDragging}
        onPointerMove={drag}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {customerReviews.map((review) => (
          <div key={review.id} className={styles.reviewSlide}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-4">
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center">
          <strong className="text-base text-dark">{reviewsSummary.score} / {reviewsSummary.totalStars}</strong>
          <div className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: reviewsSummary.totalStars }).map((_, index) => (
              <Icon key={index} name="star" className="size-3.5 text-rating" />
            ))}
          </div>
          <span className="text-[11px] text-muted">{reviewsSummary.displayCount}</span>
        </div>

        <div className="flex justify-center" aria-label="Choose review page">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToPage(index)}
              className="flex size-7 items-center justify-center rounded-full"
              aria-label={`Show review page ${index + 1}`}
              aria-current={activePage === index ? "true" : undefined}
            >
              <span className={`block rounded-full transition-all ${activePage === index ? "size-2.5 bg-primary" : "size-2 bg-stone-300 hover:bg-stone-400"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
