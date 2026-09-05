# Excel shablonlari

Ma'lumotlar shu shablonlar orqali yuklanadi. Namunalar:
`~/Desktop/electricity/xaqulobod_*.xlsx` (oldingi versiyadan, real ma'lumot).

Har bir shablon turi `ImportTemplate` enum'iga mos keladi.

---

## 1. `CONSUMERS` - iste'molchilar ro'yxati

Fayl: `xaqulobod_itemolchilar.xlsx`, varaq nomi = sana (`0108` = 01.08).

| Ustun | Sarlavha | Izoh |
|---|---|---|
| A | `No` | Tartib raqami |
| B | `ETK nomi` | masalan "Chinobod ETK" |
| C | `TP nomer` | TP raqami |
| D | `10 kV Fiderlar nomi` | masalan "Xaqulobod" |
| E | `Jami` | Jami iste'molchilar |
| F | `Aloqada <Oy>` | Onlayn hisoblagichlar |
| G | `Aloqadamas <Oy>` | Oflayn hisoblagichlar |
| H, I | `Aloqada/Aloqadamas <keyingi oy>` | Ustunlar oy bo'yicha takrorlanadi |

> Ustun soni oyga qarab o'sadi - sarlavhani **nom bo'yicha** o'qing, pozitsiya
> bo'yicha emas. Bo'sh katak = 0.

---

## 2. `TP_DAILY` - kunlik TP hisoboti

Fayl: `xaqulobod_fider.xlsx`, varaqlar `бир кунлик` / `Sheet0`.
Sarlavhalar **kirillcha**, 1-2-qatorlar - hisobot nomi va ETK, haqiqiy
sarlavha **3-4-qatorda**, ma'lumot **5-qatordan** boshlanadi.

| Ustun | Sarlavha (kirill) | Ma'nosi |
|---|---|---|
| A | `№` | Tartib raqami |
| B | `ТП НОМИ` | TP raqami |
| C | `САНА` | Sana |
| D | `Баланс хисоблагич...` | `suppliedKwh` |
| E | `Бриктирилган истеъмолчилар` | `usefulKwh` |
| F | `Тармоқдаги йўқотиш` (kWh) | `lossKwh` |
| G | `Тармоқдаги йўқотиш фоизи` | `lossPercent` |
| H | `Хатловдан кейин` | `"74/80"` = aloqada/jami |

> Bir faylda bir necha sana bloki yonma-yon turishi mumkin (C-H, keyin I-M...).
> `Хатловдан кейин` ustuni `"aloqada/jami"` formatida - `/` bo'yicha ajrating,
> bo'sh bo'lsa `"/"` keladi.

---

## 3. `TP_PERIOD` - oylik / 10-kunlik TP hisoboti

Fayl: `xaqulobod_fider.xlsx`, varaqlar `Iyul`, `Avgust`.
Sarlavha **2-qatorda**, ma'lumot **3-qatordan**.

| Ustun | Sarlavha | Ma'nosi |
|---|---|---|
| A | `T/R` | Tartib raqami |
| B | `TP` | TP raqami |
| C | `Dan` | `periodStart` |
| D | `Gacha` | `periodEnd` |
| E | `Hisoblangan` | `suppliedKwh` |
| F | `Foydali oqim` | `usefulKwh` |
| G | `Yo'qotish` | `lossKwh` |

---

## 4. `PROBLEMS` - TP muammolari

Fayl: `xaqulobod_fider.xlsx`, varaq `Muammolar`. Sarlavha 2-qatorda.

| Ustun | Sarlavha | Ma'nosi |
|---|---|---|
| A | `T/R` | Tartib raqami |
| B | `TP` | TP raqami |
| C | `Muammolar` | Muammo matni (kirillcha), bo'sh bo'lishi mumkin |

---

## Parser uchun eslatmalar

- **`exceljs`** o'rnatilgan (`npm i exceljs` allaqachon bajarilgan).
- **Sarlavha qatori qat'iy emas** - faylga qarab 1, 2, 3 yoki 4-qatorda
  bo'lishi mumkin. Sarlavhani qidirib toping, qattiq raqam yozmang.
- **Formula kataklari** `{ result, formula, sharedFormula }` obyekt qaytaradi -
  `cell.value.result` ni oling. Ba'zan `result` bo'lmaydi (hisoblanmagan
  formula) - bunday qatorni xato sifatida qayd eting, jim o'tkazib yubormang.
- **Sana** ba'zan `Date`, ba'zan `"01/08/2026"` matn, ba'zan ISO string
  bo'ladi - uchalasini ham qo'llab-quvvatlang.
- **Son** kataklarda `1 020,60` (probel + vergul) ko'rinishi mumkin.
- Har bir yuklash `ImportBatch` yozuvini yaratsin: qancha qator qo'shildi /
  yangilandi / o'tkazib yuborildi / xato. Xatolar `errors` (JSON) ga
  `{ row, column, message }` ko'rinishida yozilsin.
- Import **idempotent** bo'lsin: `TpReading` da
  `@@unique([tpPointId, periodStart, periodEnd])` bor - bir faylni ikki marta
  yuklash dublikat yaratmasligi kerak (upsert ishlating).
