import { PageShell } from "@/app/_components/page-shell";
import { AboutCta } from "./about-cta";
import { AboutHero } from "./about-hero";
import { AboutStory } from "./about-story";
import { AboutValues } from "./about-values";

export function AboutPage() {
  return <PageShell><AboutHero /><AboutStory /><AboutValues /><AboutCta /></PageShell>;
}
