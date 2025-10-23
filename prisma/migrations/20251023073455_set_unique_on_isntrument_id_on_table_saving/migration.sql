/*
  Warnings:

  - A unique constraint covering the columns `[instrument_id]` on the table `saving` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "saving_instrument_id_key" ON "saving"("instrument_id");
