# Elektr energiyasi analitik platformasi

Elektr tarmog'i bo'yicha iste'mol, yo'qotish va hisoblagich ko'rsatkichlarini
tahlil qilish tizimi. Ma'lumotlar maxsus Excel shablonlari orqali yuklanadi.

## Texnologiyalar

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Prisma 7 · PostgreSQL 18

## Ishga tushirish

```bash
# 1. Bog'liqliklar
npm install

# 2. Sozlamalar
cp .env.example .env      # DATABASE_URL ni o'zingizga moslang

# 3. Baza
createdb electricity_v3
npm run db:migrate

# 4. Ishga tushirish
npm run dev
```

Brauzerda: http://localhost:3000

> macOS'da Postgres.app ishlatilsa, `psql` va `createdb` PATH da bo'lmasligi
> mumkin: `/Applications/Postgres.app/Contents/Versions/latest/bin/`

## Buyruqlar

| Buyruq | Vazifasi |
|---|---|
| `npm run dev` | Ishlab chiqish serveri |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript tekshiruvi (avval `build` qiling) |
| `npm run db:migrate` | Yangi migratsiya yaratish va qo'llash |
| `npm run db:studio` | Prisma Studio |
| `npm run db:reset` | Bazani tozalab qayta qurish |

## Ma'lumotlar modeli

```
ETK -> Podstansiya -> Transformator -> Fider (10 kV) -> TP -> Ko'rsatkichlar
```

To'liq tavsif: [`.claude/docs/domen.md`](.claude/docs/domen.md)

## Hujjatlar

- [`.claude/docs/loyiha.md`](.claude/docs/loyiha.md) - loyiha maqsadi va qarorlar
- [`.claude/docs/domen.md`](.claude/docs/domen.md) - domen lug'ati va formulalar
- [`.claude/docs/shablonlar.md`](.claude/docs/shablonlar.md) - Excel shablonlari
- [`.claude/docs/texnologiya.md`](.claude/docs/texnologiya.md) - texnik nozikliklar
