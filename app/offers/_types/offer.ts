import type { SpecialOffer } from "@/app/_types/offer";

export type OfferCategory = "family" | "lunch" | "combo" | "weekend";
export type OfferFilter = "all" | OfferCategory;
export type OfferSort = "featured" | "savings" | "price-low" | "price-high";

export interface OfferCampaign extends SpecialOffer {
  category: OfferCategory;
  description: string;
  availability: string;
  label: string;
  slug?: string;
  rating?: number;
  reviewCount?: number;
}

export interface OfferFilterOption {
  id: OfferFilter;
  label: string;
}
