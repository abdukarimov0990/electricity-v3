"use client";

import { useState } from "react";

import { ImageSwiper } from "./ImageSwiper";
import { SafeImage } from "./SafeImage";

interface ImageGalleryProps {
  images: readonly string[];
  alt: string;
  /** Asosiy rasm konteyneri klasslari (Figma: 304x204, r16). */
  mainClassName?: string;
  thumbWidth?: number;
}

/**
 * Asosiy rasm (304x204, r16) + ostida touch/drag swiper (80x80). Lentadagi
 * rasmni bosish asosiy rasmni almashtiradi. Joylashuv o'zgarsa 1-rasmga qaytadi.
 */
export function ImageGallery({
  images,
  alt,
  mainClassName = "aspect-[304/204] w-full rounded-2xl",
  thumbWidth,
}: ImageGalleryProps) {
  // Joylashuv o'zgarganda 0 ga qaytishi uchun ota-komponent `key` beradi.
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-2.5">
      <SafeImage src={images[active]!} alt={alt} className={mainClassName} />
      <ImageSwiper
        images={images}
        activeIndex={active}
        onSelect={setActive}
        alt={alt}
        thumbWidth={thumbWidth}
      />
    </div>
  );
}
