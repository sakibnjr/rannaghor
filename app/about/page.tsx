import type { Metadata } from "next";
import { AboutPage } from "./_components/about-page";

export const metadata: Metadata = {
  title: "About | RannaGhor",
  description: "Learn how RannaGhor brings authentic Bangladeshi flavour, thoughtful cooking and warm hospitality together.",
};

export default function Page() {
  return <AboutPage />;
}
