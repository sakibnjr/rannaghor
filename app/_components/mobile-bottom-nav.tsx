"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./cart-context";
import { Icon, type IconName } from "@/app/_ui/icon";

const links: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/menu", label: "Menu", icon: "cloche" },
  { href: "/offers", label: "Offers", icon: "star" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const hidden = pathname === "/checkout";

  if (hidden) return null;

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(29,37,34,0.08)] backdrop-blur-xl md:hidden"
      >
        <div className="grid h-16 grid-cols-5 items-stretch">
          {links.map((link) => (
            <BottomLink key={link.href} {...link} active={link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)} />
          ))}

          <button
            type="button"
            onClick={openCart}
            className={`group relative flex min-w-0 flex-col items-center justify-center gap-1 ${pathname === "/cart" ? "text-primary" : "text-muted"}`}
            aria-label={`Cart with ${itemCount} items`}
          >
            <span className="relative">
              <Icon name="cart" className="size-5 transition-colors group-hover:text-primary" />
              {itemCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </span>
            <span className="text-[10px] font-semibold">Cart</span>
          </button>

          <BottomLink
            href="/login"
            label="Account"
            icon="account"
            active={pathname.startsWith("/account") || pathname === "/login" || pathname === "/register"}
          />
        </div>
      </nav>
      <div aria-hidden="true" className="h-[calc(4rem+env(safe-area-inset-bottom))] shrink-0 bg-[#0D382E] md:hidden" />
    </>
  );
}

function BottomLink({ href, label, icon, active }: { href: string; label: string; icon: IconName; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative flex min-w-0 flex-col items-center justify-center gap-1 ${active ? "text-primary" : "text-muted"}`}
    >
      {active && <span className="absolute top-0 h-0.5 w-7 rounded-full bg-primary" />}
      <Icon name={icon} className="size-5 transition-colors group-hover:text-primary" />
      <span className="text-[10px] font-semibold">{label}</span>
    </Link>
  );
}
