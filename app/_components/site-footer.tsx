import { Icon } from "@/app/_ui/icon";
import Link from "next/link";
import { rannaGhorConfig } from "@/app/_data/restaurant";
import { BrandSignature } from "@/app/_components/brand-signature";
import { Logo } from "@/app/_components/logo";

export function SiteFooter() {
  const taglineWords = rannaGhorConfig.tagline.split(" ");
  const signatureFirstLine = taglineWords.slice(0, 2).join(" ");
  const signatureSecondLine = taglineWords.slice(2).join(" ");

  return (
    <footer className="w-full bg-[#0D382E] text-stone-200 pt-14 pb-8 mt-12 border-t border-emerald-950">
      <div className="site-shell">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-emerald-800/40">
          {/* Col 1: Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Logo variant="footer" />
            <p className="text-xs text-stone-300 max-w-sm leading-relaxed">
              Authentic flavors. Fresh ingredients. Happier people. From our
              kitchen to your table, always with love.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {(["facebook", "instagram", "youtube", "tiktok"] as const).map(
                (s) => (
                  <span
                    key={s}
                    role="img"
                    aria-label={s}
                    className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white"
                  >
                    <Icon name={s} className="size-4" />
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Col 2: Restaurant (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-2.5">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Restaurant
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {["Home", "Menu", "Offers", "Gallery", "About", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                      className="hover:text-[#E8572A] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Col 3: Customer (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-2.5">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Customer
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {[
                "My Account",
                "Track Order",
                "Delivery Info",
                "FAQs",
                "Reviews",
                "Support",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-[#E8572A] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-2.5">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Legal
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {[
                "Terms & Conditions",
                "Privacy Policy",
                "Refund Policy",
                "Cookie Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-[#E8572A] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Us (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-2 text-xs text-stone-300">
            <h4 className="text-sm font-bold text-white tracking-wide mb-0.5">
              Contact Us
            </h4>
            <p className="hover:text-white transition-colors">
              +880 1712 345678
            </p>
            <p className="hover:text-white transition-colors truncate">
              hello@rannaghorbd.com
            </p>
            <p>Dhanmondi, Dhaka</p>
            <p className="text-[11px] text-stone-400">
              Open Daily: 10:00 AM – 11:00 PM
            </p>
            <div className="mt-5 self-center pr-5 lg:self-end">
              <BrandSignature
                variant="footer"
                firstLine={signatureFirstLine}
                secondLine={signatureSecondLine}
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center pt-6 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} RannaGhor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
