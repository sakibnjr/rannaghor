import type { Metadata } from "next";
import { ContactPage } from "./_components/contact-page";

export const metadata: Metadata = {
  title: "Contact | RannaGhor",
  description: "Contact RannaGhor in Dhanmondi, Dhaka for restaurant information, delivery questions and general enquiries.",
};

export default function Page() {
  return <ContactPage />;
}
