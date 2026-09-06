# Xarita sahifasi rasmlari

`/map` sahifasining "Ma'lumotlar" panelidagi rasmlar. Fayllar loyiha ildizidagi
`images/` papkasidan shu yerga ko'chirilgan (`station-1.png` … `station-4.png`).
Birinchisi asosiy rasm, hammasi pastdagi touch/swiper lentasida ko'rinadi.

Ro'yxat `src/components/map/data.ts` dagi `station.images.gallery` da. Rasmni
almashtirish uchun shu papkadagi faylni bir xil nom bilan yangilang yoki
`gallery` massivini tahrirlang.

Rasm topilmasa `SafeImage` neytral kulrang o'rin ko'rsatadi (maket buzilmaydi).
