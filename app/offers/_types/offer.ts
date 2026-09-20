import type { SpecialOffer } from "@/app/_types/offer";

export type OfferCategory = "family" | "lunch" | "combo" | "weekend";
export type OfferFilter = "all" | OfferCategory;

export interface OfferCampaign extends SpecialOffer {
  category: OfferCategory;
  description: string;
  availability: string;
  label: string;
}

export interface OfferFilterOption {
  id: OfferFilter;
  label: string;
}
