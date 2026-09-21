"use client";

import { Icon } from "@/app/_ui/icon";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

export function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Offers", href: "/offers" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Login / Account", href: "/login" },
  ];

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-brand-bg text-dark shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <Icon name={isOpen ? "close" : "menu"} className="size-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
        <m.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-x-0 top-14 z-50 border-b border-border bg-white p-5 shadow-xl"
        >
          <nav className="flex flex-col gap-3">
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium py-2 px-3 rounded-xl transition-colors ${
                    active
                      ? "bg-orange-50 text-[#E8572A] font-semibold"
                      : "text-[#1D2522] hover:bg-stone-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
