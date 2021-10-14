/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Dialogue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Dialogue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dialogue" ADD COLUMN     "id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dialogue_id_key" ON "Dialogue"("id");
