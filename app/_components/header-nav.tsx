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
    <nav aria-label="Primary navigation" className="hidden h-full items-stretch justify-self-center xl:flex">
      {NAV_LINKS.map((link) => {
        const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`relative inline-flex h-full items-center px-3 text-sm transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-center after:bg-primary after:transition-transform after:duration-200 ${
              active
                ? "font-bold text-primary after:scale-x-100"
                : "font-medium text-dark after:scale-x-0 hover:text-primary hover:after:scale-x-100"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
