import Image from "next/image";
import { storyData } from "@/app/_data/story";
import { aboutImages } from "../_data/about-content";

export function AboutStory() {
  return (
    <section className="site-shell grid items-center gap-8 py-14 sm:py-18 lg:grid-cols-2 lg:gap-14" aria-labelledby="about-story-heading">
      <div className="relative min-h-[360px] overflow-hidden rounded-3xl sm:min-h-[500px]">
        <Image src={aboutImages.restaurant} alt="The warm RannaGhor dining room in the evening" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
        <div className="absolute bottom-5 left-5 max-w-xs rounded-2xl bg-brand-bg/95 p-5 shadow-lg">
          <p className="font-serif text-xl font-bold italic leading-snug text-dark">“{storyData.quote}”</p>
          <p className="mt-2 text-xs font-bold text-secondary">{storyData.quoteAuthor}</p>
        </div>
      </div>

      <div>
        <h2 id="about-story-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">From a family table to yours.</h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
          <p>{storyData.paragraph}</p>
          <p>Our menu balances comforting classics with dishes that suit the way Dhaka eats today. We keep prices clear, portions generous and ordering simple whether you dine with us, pick up on the way home or choose delivery.</p>
          <p>What has grown since 2018 is the number of people around the table. The purpose remains the same: cook food we are proud to serve and make every guest feel welcome.</p>
        </div>
        <div className="mt-7 border-l-4 border-primary pl-5"><p className="text-lg font-bold text-dark">Authentic flavour without unnecessary fuss.</p><p className="mt-1 text-sm text-muted">That principle guides our kitchen, service and ordering experience.</p></div>
      </div>
    </section>
  );
}
