"use client";

import { useEffect, useRef, useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Rasm muvaffaqiyatli yuklanmaguncha neytral kulrang o'rin ko'rsatadi. Shu
 * sabab rasm topilmasa (foydalanuvchi Figma'dan hali qo'shmagan) hech qachon
 * "buzilgan rasm" belgisi yoki alt matni ko'rinmaydi - maket toza qoladi.
 */
export function SafeImage({ src, alt, className }: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Rasm hidratsiyadan oldin yuklanib bo'lgan bo'lishi mumkin - bu holda
  // `onLoad` ishga tushmaydi. Mount'dan so'ng holatni tekshiramiz.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, [src]);

  return (
    <div
      className={["relative overflow-hidden bg-[#EDEFF2]", className ?? ""].join(
        " ",
      )}
      role="img"
      aria-label={alt}
    >
      {!loaded && (
        <span className="absolute inset-0 flex items-center justify-center text-[#B4BAC1]">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="m3 17 5-4 4 3 3-2 6 4" />
          </svg>
        </span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt=""
        onLoad={(e) => {
          if (e.currentTarget.naturalWidth > 0) setLoaded(true);
        }}
        onError={() => setLoaded(false)}
        className={[
          "h-full w-full object-cover transition-opacity duration-200",
          loaded ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
    </div>
  );
}
