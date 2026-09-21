"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/app/_ui/icon";
import { Logo } from "./logo";
import { HeaderNav } from "./header-nav";
import { HeaderActions } from "./header-actions";
import { MobileNavDrawer } from "./mobile-nav-drawer";

export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const updateHeader = () => setCompact(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  function openMenuSearch() {
    if (pathname === "/menu") {
      window.dispatchEvent(new Event("focus-menu-search"));
      return;
    }

    window.sessionStorage.setItem("focus-menu-search", "true");
    router.push("/menu");
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-xl transition-[border-color,box-shadow] duration-200 lg:fixed lg:inset-x-0 ${
          compact ? "border-border shadow-md shadow-dark/5" : "border-border/80 shadow-none"
        }`}
      >
      <div className="site-shell grid h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 md:hidden">
        <div className="justify-self-start">
          <Logo iconOnly />
        </div>
        <button
          type="button"
          onClick={openMenuSearch}
          className="flex min-h-10 min-w-0 items-center gap-2 rounded-full border border-border bg-brand-bg px-3 text-left text-muted shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary"
          aria-label="Search the menu"
        >
          <Icon name="search" className="size-4" />
          <span className="truncate text-xs font-medium">Search food</span>
        </button>
        <div className="justify-self-end">
          <MobileNavDrawer />
        </div>
      </div>

      <div className="site-shell hidden h-14 grid-cols-[auto_1fr_auto] items-center gap-2 md:grid xl:grid-cols-[1fr_auto_1fr]">
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
      <div aria-hidden="true" className="hidden h-14 lg:block" />
    </>
  );
}
