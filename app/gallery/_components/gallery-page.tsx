import { PageShell } from "@/app/_components/page-shell";
import { GalleryBrowser } from "./gallery-browser";
import { GalleryHero } from "./gallery-hero";
import { Reveal } from "@/app/_ui/reveal";

export function GalleryPage() {
  return <PageShell><GalleryHero /><Reveal><GalleryBrowser /></Reveal></PageShell>;
}
