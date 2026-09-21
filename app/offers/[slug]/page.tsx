import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import {
  getOfferBySlug,
  getOfferSlug,
  offerCampaigns,
} from "../_data/offer-campaigns";
import { OfferDetail } from "./_components/offer-detail";

interface OfferPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...new Set(offerCampaigns.map((offer) => getOfferSlug(offer)))].map(
    (slug) => ({ slug }),
  );
}

export async function generateMetadata({
  params,
}: OfferPageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);
  if (!offer) return { title: "Offer not found | RannaGhor" };

  return {
    title: `${offer.title} Deal | RannaGhor Special Offers`,
    description: `${offer.description} Order this special package from RannaGhor for ৳${offer.discountedPrice} (Save ৳${offer.originalPrice - offer.discountedPrice}). Fast delivery across Dhaka.`,
  };
}

export default async function OfferPage({ params }: OfferPageProps) {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);
  if (!offer) notFound();

  const currentSlug = getOfferSlug(offer);
  const relatedOffers = offerCampaigns
    .filter(
      (item) => item.id !== offer.id && getOfferSlug(item) !== currentSlug,
    )
    .toSorted((first, second) => {
      const firstCategoryMatch = first.category === offer.category ? 1 : 0;
      const secondCategoryMatch = second.category === offer.category ? 1 : 0;
      return (
        secondCategoryMatch - firstCategoryMatch ||
        (second.rating ?? 0) - (first.rating ?? 0)
      );
    })
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-dark">
      <SiteHeader />
      <OfferDetail offer={offer} relatedOffers={relatedOffers} />
      <SiteFooter />
    </div>
  );
}
