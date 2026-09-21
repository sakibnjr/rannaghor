import { Icon } from "@/app/_ui/icon";
import Image from "next/image";
import Link from "next/link";
import { storyData } from "@/app/_data/story";

export function StorySection() {
  return (
    <section aria-labelledby="story-heading" className="w-full">
      {/* 3-Column Layout: Chef Photo | Story Content | Quote Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left Column: Chef Photo with Badge Overlay */}
        <div className="lg:col-span-4 xl:col-span-4 relative w-full h-[230px] sm:h-[250px] lg:h-auto rounded-2xl overflow-hidden shadow-2xs border border-[#EAE5E1] bg-stone-100">
          <Image
            src={storyData.chefImage}
            alt="Chef preparing authentic dishes at RannaGhor"
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover object-center"
          />
          {/* Overlay Script: Cooking Happiness Since 2018 */}
          <div className="absolute top-4 left-5 pointer-events-none drop-shadow-md">
            <span className="font-serif italic font-bold text-white text-base sm:text-lg tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {storyData.chefBadge}
            </span>
          </div>
        </div>

        {/* Middle Column: Story Content - Flush Top to Bottom */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between py-0.5">
          <div>
            <h2
              id="story-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1D2522] tracking-tight mt-1"
            >
              {storyData.heading}
            </h2>
            <p className="mt-2.5 text-xs font-medium leading-relaxed text-muted-strong sm:text-sm">
              {storyData.paragraph}
            </p>
          </div>

          <div className="pt-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E8572A] hover:text-[#D24519] transition-colors group"
            >
              <span>Learn More</span>
              <Icon name="arrow" className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Warm Quote Card - Matching Row Height */}
        <div className="lg:col-span-3 xl:col-span-3 flex">
          <div className="w-full relative bg-[#FAF3EB] border border-[#F0E6DC] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between overflow-hidden">
            {/* Subtle decorative botanical watermark */}
            <div className="absolute -bottom-5 -right-5 w-24 h-24 text-emerald-800/10 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0C50 0 100 20 100 70C100 120 50 100 50 100C50 100 0 120 0 70C0 20 50 0 50 0Z" />
              </svg>
            </div>

            <blockquote className="font-serif italic text-base sm:text-lg lg:text-xl font-bold text-[#2C211A] leading-snug">
              “{storyData.quote}”
            </blockquote>

            <p className="text-xs font-bold text-[#17624F] tracking-wide mt-4">
              {storyData.quoteAuthor}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
