import type { Metadata } from "next";
import { PageShell } from "@/app/_components/page-shell";
import { CheckoutPage } from "./_components/checkout-page";

export const metadata: Metadata = {
  title: "Checkout | RannaGhor",
  description: "Choose delivery or pickup and place your RannaGhor order.",
};

export default function Page() {
  return <PageShell><CheckoutPage /></PageShell>;
}
