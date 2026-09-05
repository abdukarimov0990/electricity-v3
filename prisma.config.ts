// Prisma 7 konfiguratsiyasi. Ulanish manzili endi schema.prisma'da emas,
// shu yerda turadi (https://pris.ly/d/config-datasource).
import "dotenv/config";

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
});
