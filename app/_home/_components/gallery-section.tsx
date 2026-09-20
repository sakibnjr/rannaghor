import { Icon } from "@/app/_ui/icon";
import Image from "next/image";
import Link from "next/link";
import { galleryItems } from "@/app/_data/gallery";

export function GallerySection() {
  return (
    <section aria-labelledby="gallery-heading" className="w-full">
      {/* Header Row */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2
            id="gallery-heading"
            className="text-2xl sm:text-3xl font-bold text-[#1D2522] tracking-tight"
          >
            Food Gallery
          </h2>
          <p className="text-xs sm:text-sm text-[#6B706D] mt-1">
            Good food. Great memories.
          </p>
        </div>

        <Link
          href="/gallery"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#E8572A] hover:text-[#D24519] transition-colors group"
        >
          <span>See more photos</span>
          <Icon name="arrow" className="size-3.5" />
        </Link>
      </div>

      {/* Gallery-specific photography */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {galleryItems.map((item) => (
          <figure
            key={item.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#EAE5E1] bg-stone-100 shadow-2xs"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="sr-only">{item.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
