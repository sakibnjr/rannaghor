"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Icon } from "@/app/_ui/icon";
import type { GalleryPhoto } from "../_types/gallery";

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function GalleryLightbox({ photos, activeIndex, onClose, onChange }: GalleryLightboxProps) {
  const photo = photos[activeIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange((activeIndex - 1 + photos.length) % photos.length);
      if (event.key === "ArrowRight") onChange((activeIndex + 1) % photos.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [activeIndex, onChange, onClose, photos.length]);

  return (
    <div role="dialog" aria-modal="true" aria-label={photo.title} className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/95 p-4 sm:p-8">
      <button type="button" onClick={onClose} aria-label="Close gallery" autoFocus className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><Icon name="close" /></button>
      <button type="button" onClick={() => onChange((activeIndex - 1 + photos.length) % photos.length)} aria-label="Previous photo" className="absolute left-3 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"><Icon name="left" /></button>
      <figure className="w-full max-w-6xl">
        <div className="relative h-[65vh] overflow-hidden rounded-2xl"><Image src={photo.image} alt={photo.title} fill sizes="90vw" className="object-contain" /></div>
        <figcaption className="mt-4 text-center text-white"><span className="block text-lg font-bold">{photo.title}</span><span className="mt-1 block text-sm text-stone-300">{photo.description}</span></figcaption>
      </figure>
      <button type="button" onClick={() => onChange((activeIndex + 1) % photos.length)} aria-label="Next photo" className="absolute right-3 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"><Icon name="right" /></button>
    </div>
  );
}
