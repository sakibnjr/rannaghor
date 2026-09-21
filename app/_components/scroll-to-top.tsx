"use client";

import { useEffect } from "react";

/**
 * Disables the browser's automatic scroll restoration so the page always
 * starts at the top on refresh or navigation.
 */
export function ScrollToTop() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
