import { PageShell } from "@/app/_components/page-shell";
import { GalleryBrowser } from "./gallery-browser";
import { GalleryHero } from "./gallery-hero";

export function GalleryPage() {
  return <PageShell><GalleryHero /><GalleryBrowser /></PageShell>;
}
