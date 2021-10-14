/*
  Warnings:

  - You are about to drop the column `userId` on the `Dialogue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user]` on the table `Dialogue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user` to the `Dialogue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dialogue" DROP CONSTRAINT "Dialogue_userId_fkey";

-- DropIndex
DROP INDEX "Dialogue_userId_key";

-- AlterTable
ALTER TABLE "Dialogue" DROP COLUMN "userId",
ADD COLUMN     "user" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dialogue_user_key" ON "Dialogue"("user");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Dialogue" ADD CONSTRAINT "Dialogue_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
