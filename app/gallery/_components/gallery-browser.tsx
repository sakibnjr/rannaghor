"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { galleryCategories, galleryPhotos } from "../_data/gallery-photos";
import type { GalleryCategory } from "../_types/gallery";
import { GalleryLightbox } from "./gallery-lightbox";

export function GalleryBrowser() {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const photos = useMemo(() => category === "All" ? galleryPhotos : galleryPhotos.filter((photo) => photo.category === category), [category]);

  return (
    <section className="site-shell py-10 sm:py-12" aria-labelledby="gallery-collection-heading">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><h2 id="gallery-collection-heading" className="text-2xl font-extrabold tracking-tight sm:text-3xl">Explore our gallery</h2></div>
        <p className="text-sm text-muted" role="status">{photos.length} photos</p>
      </div>
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Filter gallery photos">
        {galleryCategories.map((item) => {
          const active = category === item;
          return (
            <m.button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(item)}
              animate={{ scale: active ? 1.025 : 1 }}
              whileTap={{ scale: 0.96 }}
              className={`min-h-10 shrink-0 rounded-xl border px-3.5 text-sm font-bold ${active ? "border-primary bg-primary text-white" : "border-border bg-surface text-dark hover:border-primary hover:text-primary"}`}
            >
              {item}
            </m.button>
          );
        })}
      </div>
      <m.div
        key={category}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 grid auto-rows-[180px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {photos.map((photo, index) => {
          const featured = index === 0 || index === 7;
          return (
            <m.button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              className={`group relative overflow-hidden rounded-2xl bg-stone-100 text-left shadow-2xs hover:shadow-md ${featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
            >
              <Image src={photo.image} alt={photo.title} fill sizes={featured ? "(max-width: 1023px) 100vw, 66vw" : "(max-width: 639px) 100vw, 33vw"} className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-dark/80 p-3 text-white"><span className="block text-[10px] font-bold uppercase tracking-wider text-orange-200">{photo.category}</span><span className="mt-0.5 block text-base font-bold">{photo.title}</span></span>
            </m.button>
          );
        })}
      </m.div>
      <AnimatePresence>
        {activeIndex !== null && <GalleryLightbox photos={photos} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />}
      </AnimatePresence>
    </section>
  );
}
