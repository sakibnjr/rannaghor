"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { HeaderNav } from "./header-nav";
import { HeaderActions } from "./header-actions";
import { MobileNavDrawer } from "./mobile-nav-drawer";

export function SiteHeader() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const updateHeader = () => setCompact(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-xl transition-[border-color,box-shadow] duration-200 ${
        compact ? "border-border shadow-md shadow-dark/5" : "border-border/80 shadow-none"
      }`}
    >
      <div className="site-shell grid h-14 grid-cols-[auto_1fr_auto] items-center gap-2 xl:grid-cols-[1fr_auto_1fr]">
        {/* Left: Mobile hamburger + Brand Logo */}
        <div className="flex min-w-0 items-center gap-2 justify-self-start sm:gap-3">
          <MobileNavDrawer />
          <Logo />
        </div>

        {/* Center: Desktop Navigation Links */}
        <HeaderNav />

        {/* Right: Search, Account, Cart badge, Order CTA */}
        <HeaderActions />
      </div>
    </header>
  );
}
