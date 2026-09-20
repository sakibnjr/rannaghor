"use client";

import { Icon } from "@/app/_ui/icon";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#1D2522] hover:text-[#E8572A] rounded-lg cursor-pointer"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <Icon name={isOpen ? "close" : "menu"} className="size-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-[65px] bg-white border-b border-[#EAE5E1] p-5 shadow-xl z-50 animate-in slide-in-from-top-2">
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
        </div>
      )}
    </div>
  );
}
