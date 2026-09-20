import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import { OfferSteps } from "./offer-steps";
import { OffersBrowser } from "./offers-browser";
import { OffersHero } from "./offers-hero";

export function OffersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-dark">
      <SiteHeader />
      <main className="flex-1">
        <OffersHero />
        <OffersBrowser />
        <OfferSteps />
      </main>
      <SiteFooter />
    </div>
  );
}
