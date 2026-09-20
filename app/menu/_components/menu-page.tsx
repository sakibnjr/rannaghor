import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import { MenuBrowser } from "./menu-browser";
import { MenuHero } from "./menu-hero";
import { Reveal } from "@/app/_ui/reveal";

export function MenuPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-dark">
      <SiteHeader />
      <main className="flex-1">
        <MenuHero />
        <Reveal><MenuBrowser /></Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
