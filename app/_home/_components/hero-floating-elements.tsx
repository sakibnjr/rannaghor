import { Icon } from "@/app/_ui/icon";
import { BrandSignature } from "@/app/_components/brand-signature";
import type { HeroSlide } from "../_types/hero-slide";

interface HeroFloatingElementsProps {
  highlight: HeroSlide["highlight"];
  note: string;
}

export function HeroFloatingElements({ highlight, note }: HeroFloatingElementsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="hero-rating-card absolute right-4 top-4 rounded-xl border border-border bg-surface px-4 py-2.5 text-center shadow-sm sm:right-8 sm:top-6">
        <p className="text-2xl font-extrabold leading-tight text-dark">
          {highlight.value} {highlight.showStar && <Icon name="star" className="inline size-5 text-rating" />}
        </p>
        <p className="text-xs font-medium text-muted">{highlight.label}</p>
      </div>
      <div className="hero-signature absolute bottom-5 right-5 hidden xl:block">
        <BrandSignature variant="stamp" text={note} />
      </div>
    </div>
  );
}
