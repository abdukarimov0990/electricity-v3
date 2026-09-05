# Domen lug'ati - elektr tarmog'i

## Ierarxiya

```
ETK (Elektr Ta'minoti Korxonasi)   masalan "Chinobod ETK"
 └─ Podstansiya                    110/10 kV, 35/10 kV
     └─ Transformator              kuch transformatori, kVA quvvat
         └─ Fider (10 kV)          masalan "Xaqulobod"
             └─ TP                 Transformator Punkti, raqam bilan: 10, 24, 179
                 └─ Iste'molchilar hisoblagichlari
```

## Atamalar

| Atama | Ma'nosi | Kodda |
|---|---|---|
| **ETK** | Elektr Ta'minoti Korxonasi | `Etk` |
| **Podstansiya** | Kuchlanishni pasaytiruvchi stansiya | `Substation` |
| **Fider** | 10 kV chiquvchi liniya | `Feeder` |
| **TP** | Transformator punkti (10/0.4 kV) | `TpPoint` |
| **Balans hisoblagich** | TP kirishidagi hisoblagich - TP'ga qancha energiya kirgani | `suppliedKwh` |
| **Foydali oqim** | Iste'molchilar hisoblagichlari yig'indisi - qancha sotilgani | `usefulKwh` |
| **Yo'qotish** | `suppliedKwh - usefulKwh` | `lossKwh` |
| **Yo'qotish foizi** | `lossKwh / suppliedKwh * 100` | `lossPercent` |
| **Aloqada** | Onlayn (masofadan o'qiladigan) hisoblagich | `consumersOnline` |
| **Aloqadamas** | Oflayn - joyiga borib o'qiladi | `consumersOffline` |
| **Koeffitsient** | Hisoblagich ko'rsatkichini kWh ga aylantiruvchi ko'paytuvchi | `coefficient` |
| **Xatlov** | Iste'molchilarni joyida tekshirish (inventarizatsiya) | - |
| **Texnik yo'qotish** | Liniya va transformatorlardagi tabiiy yo'qotish (normativ) | `technicalLossKwh` |
| **Tijorat yo'qotishi** | Umumiy yo'qotish - texnik yo'qotish (ya'ni o'g'irlik / hisobga olinmagan) | `commercialLossKwh` |

## Muhim hisob-kitoblar

```
difference    = meterValue - previousValue
suppliedKwh   = difference * coefficient
lossKwh       = suppliedKwh - usefulKwh
lossPercent   = lossKwh / suppliedKwh * 100
```

## Ehtiyot bo'ling

- **Yo'qotish manfiy bo'lishi mumkin.** Real ma'lumotlarda `-172%` gacha
  uchraydi (iste'molchi hisoblagichlari TP balans hisoblagichidan ko'proq
  ko'rsatadi - hisoblagich nosozligi yoki noto'g'ri biriktirilgan TP).
  Shuning uchun `lossPercent` uchun `Decimal(9,4)` - keng diapazon olingan.
- **TP raqami - matn, son emas.** Hujjatda `07` kabi oldingi nolli raqamlar
  bor, ularni son qilsak yo'qoladi.
- **`suppliedKwh` nol yoki bo'sh bo'lishi mumkin** - hisoblagich ishlamagan
  davrlar. Bunda foizni hisoblamang (nolga bo'lish).
- Shablonlarda **kirill va o'zbek lotin** aralash keladi, ba'zi sarlavhalar
  rus tilida. Parser ikkalasini ham tanishi kerak.
