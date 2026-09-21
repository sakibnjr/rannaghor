"use client";

import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-20 right-4 z-50 flex size-11 items-center justify-center rounded-full border border-border bg-surface text-dark shadow-md transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg xl:bottom-6 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Up chevron */}
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 4 2 14l3 3 7-7 7 7 3-3Z" />
      </svg>
    </button>
  );
}
