"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryCategories, galleryPhotos } from "../_data/gallery-photos";
import type { GalleryCategory } from "../_types/gallery";
import { GalleryLightbox } from "./gallery-lightbox";

export function GalleryBrowser() {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const photos = useMemo(() => category === "All" ? galleryPhotos : galleryPhotos.filter((photo) => photo.category === category), [category]);

  return (
    <section className="site-shell page-section" aria-labelledby="gallery-collection-heading">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><h2 id="gallery-collection-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">Explore our gallery</h2></div>
        <p className="text-sm text-muted" role="status">{photos.length} photos</p>
      </div>
      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Filter gallery photos">
        {galleryCategories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold ${category === item ? "border-primary bg-primary text-white" : "border-border bg-surface text-dark hover:border-primary hover:text-primary"}`}>{item}</button>)}
      </div>
      <div className="mt-7 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => {
          const featured = index === 0 || index === 7;
          return (
            <button key={photo.id} type="button" onClick={() => setActiveIndex(index)} className={`group relative overflow-hidden rounded-3xl bg-stone-100 text-left ${featured ? "sm:col-span-2 sm:row-span-2" : ""}`}>
              <Image src={photo.image} alt={photo.title} fill sizes={featured ? "(max-width: 1023px) 100vw, 66vw" : "(max-width: 639px) 100vw, 33vw"} className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-dark/80 p-4 text-white"><span className="block text-xs font-bold uppercase tracking-wider text-orange-200">{photo.category}</span><span className="mt-1 block text-lg font-bold">{photo.title}</span></span>
            </button>
          );
        })}
      </div>
      {activeIndex !== null && <GalleryLightbox photos={photos} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />}
    </section>
  );
}
