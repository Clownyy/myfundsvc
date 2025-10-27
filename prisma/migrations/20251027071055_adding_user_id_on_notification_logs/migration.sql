/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `notification_log` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `notification_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification_log" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "notification_log_user_id_key" ON "notification_log"("user_id");

-- AddForeignKey
ALTER TABLE "notification_log" ADD CONSTRAINT "notification_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
