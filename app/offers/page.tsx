import type { Metadata } from "next";
import { OffersPage } from "./_components/offers-page";

export const metadata: Metadata = {
  title: "Offers | RannaGhor",
  description:
    "Save on RannaGhor family feasts, lunch specials and food combos. Browse current deals with clear prices in BDT.",
};

export default function Page() {
  return <OffersPage />;
}
