"use client";

import { Icon } from "@/app/_ui/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

export function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const links = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Offers", href: "/offers" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Login / Account", href: "/login" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <m.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 cursor-default bg-dark/60 backdrop-blur-xs"
            aria-label="Close navigation menu"
            tabIndex={-1}
          />

          <m.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="absolute inset-y-0 right-0 flex h-dvh w-[86vw] max-w-[360px] flex-col border-l border-border bg-white shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <p className="text-lg font-extrabold text-dark">Menu</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-brand-bg text-dark transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary"
                aria-label="Close menu"
              >
                <Icon name="close" className="size-4" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5" aria-label="Main navigation">
              {links.map((link) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-primary-light text-primary"
                        : "text-dark hover:bg-brand-bg hover:text-primary"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="shrink-0 border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <Link href="/menu" onClick={() => setIsOpen(false)} className="section-action section-action-compact w-full bg-primary text-white hover:bg-primary-hover">
                Order now <Icon name="arrow" className="size-3.5" />
              </Link>
            </div>
          </m.aside>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-brand-bg text-dark shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Icon name="menu" className="size-6" />
      </button>

      {mounted && typeof document !== "undefined" ? createPortal(drawerContent, document.body) : null}
    </div>
  );
}
