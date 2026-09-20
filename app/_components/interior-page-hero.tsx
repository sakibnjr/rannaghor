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
      className="relative isolate h-[430px] overflow-hidden border-b border-border bg-brand-bg sm:h-[360px] lg:h-[320px]"
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,249,245,1)_0%,rgba(255,249,245,0.96)_32%,rgba(255,249,245,0.72)_48%,rgba(255,249,245,0)_76%)]"
        aria-hidden="true"
      />
      <div className="site-shell flex h-full items-center py-7">
        <Reveal className="max-w-[570px] rounded-2xl bg-brand-bg/94 p-5 shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
