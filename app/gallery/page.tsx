import type { Metadata } from "next";
import { GalleryPage } from "./_components/gallery-page";

export const metadata: Metadata = {
  title: "Gallery | RannaGhor",
  description: "Explore RannaGhor food, kitchen and restaurant photography from Dhanmondi, Dhaka.",
};

export default function Page() {
  return <GalleryPage />;
}
