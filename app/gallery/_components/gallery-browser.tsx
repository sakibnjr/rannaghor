"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { galleryPhotos } from "../_data/gallery-photos";
import { GalleryLightbox } from "./gallery-lightbox";

export function GalleryBrowser() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      className="site-shell py-6 sm:py-7 lg:py-8"
      aria-labelledby="gallery-collection-heading"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2
            id="gallery-collection-heading"
            className="text-2xl font-extrabold tracking-tight text-dark sm:text-3xl"
          >
            Explore our gallery
          </h2>
          <p className="mt-1 text-sm text-muted">
            A glimpse into our kitchen, dining spaces, and signature dishes.
          </p>
        </div>
        <p className="text-sm font-semibold text-secondary" role="status">
          {galleryPhotos.length} photos
        </p>
      </div>

      <div className="mt-5 grid auto-rows-[180px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {galleryPhotos.map((photo, index) => {
          const featured = index === 0 || index === 7;
          return (
            <m.button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              className={`group relative overflow-hidden rounded-2xl bg-stone-100 text-left shadow-2xs hover:shadow-md ${
                featured ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes={
                  featured
                    ? "(max-width: 1023px) 100vw, 66vw"
                    : "(max-width: 639px) 100vw, 33vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/85 via-dark/40 to-transparent p-3 text-white">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-200">
                  {photo.category}
                </span>
                <span className="mt-0.5 block text-base font-bold">{photo.title}</span>
              </span>
            </m.button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <GalleryLightbox
            photos={galleryPhotos}
            activeIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onChange={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
