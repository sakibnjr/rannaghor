import { Suspense } from "react";
import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import { MenuBrowser } from "./menu-browser";
import { MenuHero } from "./menu-hero";

export function MenuPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-dark">
      <SiteHeader />
      <main className="flex-1">
        <MenuHero />
        <Suspense fallback={<div className="site-shell py-12 text-center text-muted">Loading menu dishes...</div>}>
          <MenuBrowser />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
