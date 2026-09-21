import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/app/_ui/reveal";

interface InteriorPageHeroProps {
  labelledBy: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  children: ReactNode;
}

export function InteriorPageHero({
  labelledBy,
  image,
  imageAlt,
  imagePosition = "center",
  children,
}: InteriorPageHeroProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className="hidden sm:block relative isolate overflow-hidden border-b border-border bg-brand-bg py-6 sm:py-7 lg:py-8"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,249,245,0.98)_0%,rgba(255,249,245,0.9)_22%,rgba(255,249,245,0.35)_38%,rgba(255,249,245,0)_50%)]"
        aria-hidden="true"
      />
      <div className="site-shell flex items-center">
        <Reveal className="max-w-[540px] rounded-xl bg-brand-bg/94 p-4 shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
