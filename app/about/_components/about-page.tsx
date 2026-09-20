import { PageShell } from "@/app/_components/page-shell";
import { AboutCta } from "./about-cta";
import { AboutHero } from "./about-hero";
import { AboutStory } from "./about-story";
import { AboutValues } from "./about-values";
import { Reveal } from "@/app/_ui/reveal";

export function AboutPage() {
  return (
    <PageShell>
      <AboutHero />
      <Reveal><AboutStory /></Reveal>
      <Reveal><AboutValues /></Reveal>
      <Reveal><AboutCta /></Reveal>
    </PageShell>
  );
}
