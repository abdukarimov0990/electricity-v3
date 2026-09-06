import type { Metadata } from "next";

import { prisma } from "@/lib/db/prisma";

export const metadata: Metadata = {
  title: "Baza holati",
};

// Sahifa har safar bazadan o'qiydi.
export const dynamic = "force-dynamic";

async function getStatus() {
  try {
    const [etks, substations, feeders, tpPoints, tpReadings, imports] =
      await Promise.all([
        prisma.etk.count(),
        prisma.substation.count(),
        prisma.feeder.count(),
        prisma.tpPoint.count(),
        prisma.tpReading.count(),
        prisma.importBatch.count(),
      ]);

    return {
      ok: true as const,
      rows: [
        { label: "ETK", value: etks },
        { label: "Podstansiya", value: substations },
        { label: "Fider", value: feeders },
        { label: "TP", value: tpPoints },
        { label: "TP ko'rsatkichlari", value: tpReadings },
        { label: "Yuklashlar", value: imports },
      ],
    };
  } catch (error) {
    return {
      ok: false as const,
      message: error instanceof Error ? error.message : "Noma'lum xato",
    };
  }
}

export default async function StatusPage() {
  const status = await getStatus();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium text-neutral-500">
          Elektr energiyasi analitik platformasi
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Loyiha sozlandi
        </h1>
        <p className="text-neutral-600">
          Next.js, TypeScript, Tailwind CSS, Prisma va PostgreSQL ulanib,
          ishlashga tayyor. Keyingi qadam &mdash; admin panel va shablon orqali
          ma&apos;lumot yuklash.
        </p>
      </header>

      <section className="rounded-xl border border-neutral-200 p-6">
        <h2 className="mb-4 text-sm font-semibold text-neutral-500">
          Ma&apos;lumotlar bazasi
        </h2>

        {status.ok ? (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {status.rows.map((row) => (
              <div key={row.label}>
                <dt className="text-xs text-neutral-500">{row.label}</dt>
                <dd className="font-mono text-2xl tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="font-mono text-sm text-red-600">
            Bazaga ulanib bo&apos;lmadi: {status.message}
          </p>
        )}
      </section>
    </main>
  );
}
