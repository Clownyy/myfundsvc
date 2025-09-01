-- AlterTable
ALTER TABLE "instrument" ADD COLUMN     "instrument_type_id" INTEGER;

-- CreateTable
CREATE TABLE "instrument_type" (
    "id" SERIAL NOT NULL,
    "type_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instrument_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "instrument_type_id_key" ON "instrument_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "instrument_type_type_name_key" ON "instrument_type"("type_name");

-- AddForeignKey
ALTER TABLE "instrument" ADD CONSTRAINT "instrument_instrument_type_id_fkey" FOREIGN KEY ("instrument_type_id") REFERENCES "instrument_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
