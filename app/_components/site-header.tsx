import { Logo } from "./logo";
import { HeaderNav } from "./header-nav";
import { HeaderActions } from "./header-actions";
import { MobileNavDrawer } from "./mobile-nav-drawer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#EAE5E1] transition-all">
      <div className="site-shell flex h-16 items-center justify-between sm:h-[70px]">
        {/* Left: Mobile hamburger + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
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
