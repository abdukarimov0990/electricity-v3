"use client";

import { useRef } from "react";

import { SafeImage } from "./SafeImage";

interface ImageSwiperProps {
  images: readonly string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  alt: string;
  /** Bitta thumbnail eni (px). Figma: 80. */
  thumbWidth?: number;
}

/**
 * Gorizontal rasm lentasi - pagination/navigatsiyasiz, faqat touch/drag bilan
 * suriladi (Figma: 80x80, r12, tanlanganida #007CD2 ramka). 4 ta rasm 304px
 * panelga sig'maydi -> surish orqali ko'riladi.
 */
export function ImageSwiper({
  images,
  activeIndex,
  onSelect,
  alt,
  thumbWidth = 80,
}: ImageSwiperProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0, moved: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      className="flex touch-pan-x cursor-grab snap-x gap-2.5 overflow-x-auto overscroll-x-contain select-none [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
    >
      {images.map((src, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={`${src}-${i}`}
            type="button"
            aria-label={`${alt} ${i + 1}`}
            aria-current={isActive}
            onClick={() => {
              if (drag.current.moved < 6) onSelect(i);
            }}
            style={{ width: thumbWidth }}
            className={[
              "shrink-0 snap-start overflow-hidden rounded-xl transition",
              isActive ? "ring-2 ring-[#007CD2]" : "ring-2 ring-white",
            ].join(" ")}
          >
            <SafeImage
              src={src}
              alt={`${alt} ${i + 1}`}
              className="pointer-events-none aspect-square w-full"
            />
          </button>
        );
      })}
    </div>
  );
}
