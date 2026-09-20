import type { Metadata } from "next";
import { MenuPage } from "./_components/menu-page";

export const metadata: Metadata = {
  title: "Menu | RannaGhor",
  description: "Browse RannaGhor's biryani, grills, burgers, drinks and desserts. Prices are shown in BDT.",
};

export default function Page() {
  return <MenuPage />;
}
