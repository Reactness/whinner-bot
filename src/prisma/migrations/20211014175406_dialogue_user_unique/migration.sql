/*
  Warnings:

  - A unique constraint covering the columns `[user]` on the table `Dialogue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dialogue_user_key" ON "Dialogue"("user");
