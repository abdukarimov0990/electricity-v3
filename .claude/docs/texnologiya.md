# Texnik sozlamalar

## Stack

| Qatlam | Tanlov | Versiya |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.3.4 |
| Til | TypeScript | 5.x |
| Stil | Tailwind CSS | v4 |
| ORM | Prisma | **7.10.0 (qat'iy)** |
| Baza | PostgreSQL (Postgres.app) | 18.4 |
| Excel | exceljs | 4.4 |
| Validatsiya | zod | 4.x |

## Buyruqlar

```bash
npm run dev          # ishlab chiqish serveri (localhost:3000)
npm run build        # production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit  (avval `npm run build` kerak, pastga qarang)

npm run db:migrate   # yangi migratsiya yaratish va qo'llash
npm run db:deploy    # mavjud migratsiyalarni qo'llash (production)
npm run db:generate  # Prisma klientini qayta generatsiya qilish
npm run db:studio    # Prisma Studio
npm run db:reset     # bazani tozalab qayta qurish
```

## Ma'lumotlar bazasi

- Postgres **Postgres.app** orqali ishlaydi (Homebrew emas), binarlar:
  `/Applications/Postgres.app/Contents/Versions/latest/bin/`
- Baza: `electricity_v3`, foydalanuvchi: `yaxyobek` (parolsiz, lokal trust).
- `DATABASE_URL` `.env` da. `.env` git'ga tushmaydi, `.env.example` tushadi.

```bash
# psql PATH da yo'q, to'liq yo'l bilan:
/Applications/Postgres.app/Contents/Versions/latest/bin/psql -d electricity_v3
```

## Diqqat qilinadigan joylar

### 1. Prisma 7 - `url` endi schema'da emas

Prisma 7 da `datasource db { url = env(...) }` **ishlamaydi**. Ulanish manzili
ildizdagi `prisma.config.ts` da beriladi, runtime'da esa **driver adapter**
(`@prisma/adapter-pg`) orqali - `src/lib/db/prisma.ts` ga qarang.

`PrismaClient` ni adaptersiz yaratib bo'lmaydi.

### 2. Prisma versiyasi qat'iy 7.10.0

npm'dagi `latest` teg `8.0.0-rc` (release candidate) ga ishora qiladi.
Davlat loyihasida RC ishlatilmaydi - **`prisma@latest` yozmang**, versiyani
qat'iy qoldiring. Oxirgi stabil: `npm view prisma dist-tags` -> `prev`.

### 3. Generatsiya qilingan klient - `src/generated/prisma`

Git'ga tushmaydi (`.gitignore`), `postinstall` da avtomatik qayta yaratiladi.
ESLint uni tekshirmaydi (`eslint.config.mjs` dagi `globalIgnores`).

### 4. `tsc --noEmit` yolg'iz ishlamaydi

Next.js `LayoutProps` kabi tiplarni `.next/types` ga generatsiya qiladi.
Toza papkada `npm run typecheck` xato beradi - avval `npm run build` qiling
(yoki hech bo'lmasa bir marta `npm run dev` ishga tushiring).

### 5. npm keshi buzilgan

`~/.npm` ichida root egaligidagi fayllar bor, shuning uchun `npm install`
ba'zan `ENOENT` / `EEXIST` beradi. Doimiy yechim (foydalanuvchi bajarishi
kerak, parol so'raydi):

```bash
sudo chown -R 501:20 ~/.npm
```

Vaqtinchalik chetlab o'tish: `npm_config_cache=<boshqa papka> npm install`.

### 6. Mavzu - faqat oq

Sayt doim **light** rejimda. `globals.css` da `color-scheme: light` qo'yilgan,
`prefers-color-scheme: dark` bloki **ataylab olib tashlangan** - foydalanuvchi
OS'da tungi rejimda bo'lsa ham sayt oq qoladi.

`dark:` Tailwind klasslarini yozmang. Tungi mavzu kerak bo'lganda alohida
qo'shiladi (`globals.css` dagi izohda yo'l ko'rsatilgan).

### 7. Shriftlar

`next/font/google` (Geist) ishlatilyapti - build paytida yuklab olinadi va
o'zi hostlanadi, ish paytida tashqi so'rov yubormaydi. Agar loyiha **build
paytida ham to'liq offline** bo'lishi kerak bo'lsa, shriftni lokal fayl qilib
qo'yish kerak (oldingi BEAP loyihasida shunday qat'iy talab bor edi -
foydalanuvchidan so'rang).

## Papka tuzilmasi

```
prisma/
  schema.prisma        # ma'lumotlar modeli
  migrations/          # migratsiya tarixi
prisma.config.ts       # Prisma 7 konfiguratsiyasi (ulanish manzili)
src/
  app/                 # Next.js App Router sahifalari
  lib/db/prisma.ts     # PrismaClient singleton (adapter bilan)
  generated/prisma/    # generatsiya qilingan klient (git'da yo'q)
.claude/docs/          # loyiha hujjatlari (shu papka)
```
