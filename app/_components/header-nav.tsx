"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-7">
      {NAV_LINKS.map((link) => {
        const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`relative py-1 text-sm font-medium transition-colors hover:text-[#E8572A] ${
              active ? "text-[#E8572A] font-semibold" : "text-[#1D2522]"
            }`}
          >
            {link.label}
            {active && (
              <span
                className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#E8572A] rounded-full"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
