"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { BrandSignature } from "@/app/_components/brand-signature";
import { Logo } from "@/app/_components/logo";
import { rannaGhorConfig } from "@/app/_data/restaurant";
import { Icon } from "@/app/_ui/icon";

const restaurantLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const customerLinks = [
  { label: "My account", href: "/login" },
  { label: "View cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "Track order", href: "/account" },
  { label: "Delivery information", href: "/contact" },
  { label: "Help & FAQs", href: "/about" },
];

const legalLinks = ["Terms & Conditions", "Privacy Policy", "Refund Policy", "Cookie Policy"];
const socialLinks = ["facebook", "instagram", "youtube", "tiktok"] as const;

function DesktopLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={`${title} links`}>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-orange-200">{title}</h2>
      <ul className="mt-3 grid gap-1.5 text-sm text-stone-300">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="inline-flex min-h-5 items-center transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  const taglineWords = rannaGhorConfig.tagline.split(" ");
  const address = [
    rannaGhorConfig.address.street,
    rannaGhorConfig.address.area,
    rannaGhorConfig.address.city,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="w-full border-t border-emerald-950 bg-[#0D382E] text-stone-200">
      <div className="site-shell">
        {/* ========================================================================= */}
        {/* MOBILE LAYOUT (< md) - Modern Collapsible Accordions                      */}
        {/* ========================================================================= */}
        <div className="block py-6 md:hidden">
          {/* Brand Header */}
          <div className="flex flex-col items-start gap-2.5">
            <Logo variant="footer" />
            <p className="max-w-xs text-xs leading-relaxed text-stone-300">
              {rannaGhorConfig.heroSubtext}
            </p>
            <nav className="mt-1 flex items-center gap-2" aria-label="Social media">
              {socialLinks.map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social[0].toUpperCase() + social.slice(1)}
                  className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-white transition-colors hover:bg-primary"
                >
                  <Icon name={social} className="size-3.5" />
                </a>
              ))}
            </nav>
          </div>

          {/* Accordion List */}
          <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
            {/* Accordion 1: Restaurant Links */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("restaurant")}
                aria-expanded={openSection === "restaurant"}
                className="flex w-full items-center justify-between py-3.5 text-left text-xs font-bold uppercase tracking-[0.16em] text-orange-200"
              >
                <span>Restaurant</span>
                <span className="text-base font-black text-white/70">
                  {openSection === "restaurant" ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openSection === "restaurant" && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ul className="grid grid-cols-2 gap-2 pb-3.5 text-xs text-stone-300">
                      {restaurantLinks.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="inline-block py-1 hover:text-white transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: Customer Links */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("customer")}
                aria-expanded={openSection === "customer"}
                className="flex w-full items-center justify-between py-3.5 text-left text-xs font-bold uppercase tracking-[0.16em] text-orange-200"
              >
                <span>For Customers</span>
                <span className="text-base font-black text-white/70">
                  {openSection === "customer" ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openSection === "customer" && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ul className="grid grid-cols-2 gap-2 pb-3.5 text-xs text-stone-300">
                      {customerLinks.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="inline-block py-1 hover:text-white transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3: Contact & Location */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("contact")}
                aria-expanded={openSection === "contact"}
                className="flex w-full items-center justify-between py-3.5 text-left text-xs font-bold uppercase tracking-[0.16em] text-orange-200"
              >
                <span>Visit or Call</span>
                <span className="text-base font-black text-white/70">
                  {openSection === "contact" ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openSection === "contact" && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2.5 pb-4 text-xs">
                      <a
                        href={`tel:${rannaGhorConfig.contact.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2.5 text-white hover:text-orange-200"
                      >
                        <Icon name="phone" className="size-3.5 text-primary" />
                        <span className="font-bold">{rannaGhorConfig.contact.phone}</span>
                      </a>
                      {rannaGhorConfig.contact.email && (
                        <a
                          href={`mailto:${rannaGhorConfig.contact.email}`}
                          className="flex items-center gap-2.5 text-stone-300 hover:text-white"
                        >
                          <Icon name="mail" className="size-3.5 text-primary" />
                          <span>{rannaGhorConfig.contact.email}</span>
                        </a>
                      )}
                      <p className="flex items-start gap-2.5 text-stone-300">
                        <Icon name="pin" className="mt-0.5 size-3.5 text-primary shrink-0" />
                        <span>{address}</span>
                      </p>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP / TABLET LAYOUT (>= md) - Standard Multi-Column Grid              */}
        {/* ========================================================================= */}
        <div className="hidden py-8 md:grid md:grid-cols-2 lg:grid-cols-12 lg:gap-7 lg:py-9">
          <div className="md:col-span-2 lg:col-span-4">
            <Logo variant="footer" />
            <p className="mt-4 max-w-sm text-sm leading-5 text-stone-300">
              {rannaGhorConfig.heroSubtext}
            </p>
            <nav className="mt-5 flex items-center gap-1.5" aria-label="Social media">
              {socialLinks.map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social[0].toUpperCase() + social.slice(1)}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-white transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary"
                >
                  <Icon name={social} className="size-3.5" />
                </a>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-2 gap-6 md:col-span-1 lg:col-span-5 lg:grid-cols-2">
            <DesktopLinkGroup title="Restaurant" links={restaurantLinks} />
            <DesktopLinkGroup title="For customers" links={customerLinks} />
          </div>

          <aside
            className="md:col-span-1 lg:col-span-3"
            aria-label="Restaurant contact information"
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-orange-200">
              Visit or call
            </h2>
            <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <div
                className="absolute -right-10 -top-12 size-36 rounded-full border-[24px] border-white/[0.035]"
                aria-hidden="true"
              />
              <div className="relative grid gap-3 text-sm">
                <a
                  href={`tel:${rannaGhorConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-white hover:text-orange-200"
                >
                  <Icon name="phone" className="mt-0.5 size-4 text-primary" />
                  <span className="font-semibold">{rannaGhorConfig.contact.phone}</span>
                </a>
                {rannaGhorConfig.contact.email && (
                  <a
                    href={`mailto:${rannaGhorConfig.contact.email}`}
                    className="flex items-start gap-3 text-stone-300 hover:text-white"
                  >
                    <Icon name="mail" className="mt-0.5 size-4 text-primary" />
                    <span className="break-all">{rannaGhorConfig.contact.email}</span>
                  </a>
                )}
                <p className="flex items-start gap-3 text-stone-300">
                  <Icon name="pin" className="mt-0.5 size-4 text-primary" />
                  <span>{address}</span>
                </p>
              </div>
              <div className="relative mt-5 flex justify-center">
                <BrandSignature
                  variant="footer"
                  firstLine={taglineWords.slice(0, 2).join(" ")}
                  secondLine={taglineWords.slice(2).join(" ")}
                />
              </div>
            </div>
          </aside>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM LEGAL BAR                                                          */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-2.5 border-t border-white/10 pb-5 pt-3.5 text-[11px] text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:pb-7 sm:text-xs">
          <p>&copy; {new Date().getFullYear()} RannaGhor. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-3.5 gap-y-1">
            {legalLinks.map((link) => (
              <Link key={link} href="#" className="hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
