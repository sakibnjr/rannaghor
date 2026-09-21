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
      className="relative isolate hidden min-h-[18rem] overflow-hidden border-b border-border bg-brand-bg py-7 sm:flex lg:min-h-[20rem] lg:py-8 2xl:min-h-[21rem]"
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,249,245,1)_0%,rgba(255,249,245,0.98)_28%,rgba(255,249,245,0.84)_44%,rgba(255,249,245,0.28)_62%,rgba(255,249,245,0)_74%)]"
        aria-hidden="true"
      />
      <div className="site-shell flex flex-1 items-center">
        <Reveal className="max-w-[540px] rounded-xl bg-brand-bg/94 p-4 shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
