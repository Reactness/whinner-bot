/*
  Warnings:

  - You are about to drop the column `user` on the `Dialogue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Dialogue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Dialogue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dialogue" DROP CONSTRAINT "Dialogue_user_fkey";

-- DropIndex
DROP INDEX "Dialogue_user_key";

-- DropIndex
DROP INDEX "User_userName_key";

-- AlterTable
ALTER TABLE "Dialogue" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dialogue_userId_key" ON "Dialogue"("userId");

-- AddForeignKey
ALTER TABLE "Dialogue" ADD CONSTRAINT "Dialogue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
