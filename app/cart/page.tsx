import type { Metadata } from "next";
import { PageShell } from "@/app/_components/page-shell";
import { CartPage } from "./_components/cart-page";

export const metadata: Metadata = {
  title: "Your Cart | RannaGhor",
  description: "Review your selected dishes, quantities, discounts, and order total.",
};

export default function Page() {
  return <PageShell><CartPage /></PageShell>;
}
