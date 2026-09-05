-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OPERATOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "ImportTemplate" AS ENUM ('TP_DAILY', 'TP_PERIOD', 'FEEDER_PERIOD', 'CONSUMERS', 'PROBLEMS');

-- CreateEnum
CREATE TYPE "ImportStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ProblemSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "ProblemStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED');

-- CreateTable
CREATE TABLE "etks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "etks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "substations" (
    "id" TEXT NOT NULL,
    "etkId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "voltageType" TEXT NOT NULL,
    "address" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "substations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transformers" (
    "id" TEXT NOT NULL,
    "substationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacityKva" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transformers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeders" (
    "id" TEXT NOT NULL,
    "transformerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "voltage" INTEGER NOT NULL DEFAULT 10,
    "coefficient" INTEGER NOT NULL DEFAULT 1,
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feeders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tp_points" (
    "id" TEXT NOT NULL,
    "feederId" TEXT NOT NULL,
    "tpNumber" TEXT NOT NULL,
    "address" TEXT,
    "capacityKva" INTEGER,
    "coefficient" INTEGER NOT NULL DEFAULT 1,
    "meterSerial" TEXT,
    "meterType" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tp_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tp_readings" (
    "id" TEXT NOT NULL,
    "tpPointId" TEXT NOT NULL,
    "periodStart" DATE NOT NULL,
    "periodEnd" DATE NOT NULL,
    "meterValue" DECIMAL(14,2) NOT NULL,
    "previousValue" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "difference" DECIMAL(14,2) NOT NULL,
    "coefficient" INTEGER NOT NULL DEFAULT 1,
    "suppliedKwh" DECIMAL(16,2) NOT NULL,
    "usefulKwh" DECIMAL(16,2),
    "lossKwh" DECIMAL(16,2),
    "lossPercent" DECIMAL(9,4),
    "consumersTotal" INTEGER,
    "consumersOnline" INTEGER,
    "consumersOffline" INTEGER,
    "zoneT1" DECIMAL(14,2),
    "zoneT2" DECIMAL(14,2),
    "zoneT3" DECIMAL(14,2),
    "zoneT4" DECIMAL(14,2),
    "reactivePlus" DECIMAL(14,2),
    "reactiveMinus" DECIMAL(14,2),
    "isBaseline" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "importBatchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tp_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeder_readings" (
    "id" TEXT NOT NULL,
    "feederId" TEXT NOT NULL,
    "periodStart" DATE NOT NULL,
    "periodEnd" DATE NOT NULL,
    "meterValue" DECIMAL(14,2) NOT NULL,
    "previousValue" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "difference" DECIMAL(14,2) NOT NULL,
    "coefficient" INTEGER NOT NULL DEFAULT 1,
    "suppliedKwh" DECIMAL(16,2) NOT NULL,
    "usefulKwh" DECIMAL(16,2),
    "lossKwh" DECIMAL(16,2),
    "lossPercent" DECIMAL(9,4),
    "technicalLossKwh" DECIMAL(16,2),
    "technicalLossPercent" DECIMAL(5,2),
    "commercialLossKwh" DECIMAL(16,2),
    "isBaseline" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "importBatchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feeder_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tp_problems" (
    "id" TEXT NOT NULL,
    "tpPointId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" "ProblemSeverity" NOT NULL DEFAULT 'MEDIUM',
    "status" "ProblemStatus" NOT NULL DEFAULT 'OPEN',
    "detectedAt" DATE NOT NULL,
    "resolvedAt" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tp_problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_batches" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "templateType" "ImportTemplate" NOT NULL,
    "status" "ImportStatus" NOT NULL DEFAULT 'PENDING',
    "periodStart" DATE,
    "periodEnd" DATE,
    "totalRows" INTEGER NOT NULL DEFAULT 0,
    "insertedRows" INTEGER NOT NULL DEFAULT 0,
    "updatedRows" INTEGER NOT NULL DEFAULT 0,
    "skippedRows" INTEGER NOT NULL DEFAULT 0,
    "errorRows" INTEGER NOT NULL DEFAULT 0,
    "errors" JSONB,
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "import_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'VIEWER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "etks_name_key" ON "etks"("name");

-- CreateIndex
CREATE INDEX "substations_etkId_idx" ON "substations"("etkId");

-- CreateIndex
CREATE UNIQUE INDEX "substations_etkId_name_key" ON "substations"("etkId", "name");

-- CreateIndex
CREATE INDEX "transformers_substationId_idx" ON "transformers"("substationId");

-- CreateIndex
CREATE UNIQUE INDEX "transformers_substationId_name_key" ON "transformers"("substationId", "name");

-- CreateIndex
CREATE INDEX "feeders_transformerId_idx" ON "feeders"("transformerId");

-- CreateIndex
CREATE UNIQUE INDEX "feeders_transformerId_name_key" ON "feeders"("transformerId", "name");

-- CreateIndex
CREATE INDEX "tp_points_feederId_idx" ON "tp_points"("feederId");

-- CreateIndex
CREATE UNIQUE INDEX "tp_points_feederId_tpNumber_key" ON "tp_points"("feederId", "tpNumber");

-- CreateIndex
CREATE INDEX "tp_readings_periodStart_idx" ON "tp_readings"("periodStart");

-- CreateIndex
CREATE INDEX "tp_readings_importBatchId_idx" ON "tp_readings"("importBatchId");

-- CreateIndex
CREATE UNIQUE INDEX "tp_readings_tpPointId_periodStart_periodEnd_key" ON "tp_readings"("tpPointId", "periodStart", "periodEnd");

-- CreateIndex
CREATE INDEX "feeder_readings_periodStart_idx" ON "feeder_readings"("periodStart");

-- CreateIndex
CREATE INDEX "feeder_readings_importBatchId_idx" ON "feeder_readings"("importBatchId");

-- CreateIndex
CREATE UNIQUE INDEX "feeder_readings_feederId_periodStart_periodEnd_key" ON "feeder_readings"("feederId", "periodStart", "periodEnd");

-- CreateIndex
CREATE INDEX "tp_problems_tpPointId_idx" ON "tp_problems"("tpPointId");

-- CreateIndex
CREATE INDEX "tp_problems_status_idx" ON "tp_problems"("status");

-- CreateIndex
CREATE INDEX "import_batches_templateType_idx" ON "import_batches"("templateType");

-- CreateIndex
CREATE INDEX "import_batches_status_idx" ON "import_batches"("status");

-- CreateIndex
CREATE INDEX "import_batches_createdAt_idx" ON "import_batches"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "substations" ADD CONSTRAINT "substations_etkId_fkey" FOREIGN KEY ("etkId") REFERENCES "etks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transformers" ADD CONSTRAINT "transformers_substationId_fkey" FOREIGN KEY ("substationId") REFERENCES "substations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeders" ADD CONSTRAINT "feeders_transformerId_fkey" FOREIGN KEY ("transformerId") REFERENCES "transformers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tp_points" ADD CONSTRAINT "tp_points_feederId_fkey" FOREIGN KEY ("feederId") REFERENCES "feeders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tp_readings" ADD CONSTRAINT "tp_readings_tpPointId_fkey" FOREIGN KEY ("tpPointId") REFERENCES "tp_points"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tp_readings" ADD CONSTRAINT "tp_readings_importBatchId_fkey" FOREIGN KEY ("importBatchId") REFERENCES "import_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeder_readings" ADD CONSTRAINT "feeder_readings_feederId_fkey" FOREIGN KEY ("feederId") REFERENCES "feeders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeder_readings" ADD CONSTRAINT "feeder_readings_importBatchId_fkey" FOREIGN KEY ("importBatchId") REFERENCES "import_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tp_problems" ADD CONSTRAINT "tp_problems_tpPointId_fkey" FOREIGN KEY ("tpPointId") REFERENCES "tp_points"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_batches" ADD CONSTRAINT "import_batches_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
