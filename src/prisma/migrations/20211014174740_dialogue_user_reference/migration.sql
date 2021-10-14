/*
  Warnings:

  - You are about to drop the column `userId` on the `Dialogue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Dialogue" DROP CONSTRAINT "Dialogue_userId_fkey";

-- AlterTable
ALTER TABLE "Dialogue" DROP COLUMN "userId",
ADD COLUMN     "user" TEXT;

-- DropEnum
DROP TYPE "Context";

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Dialogue" ADD CONSTRAINT "Dialogue_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("userName") ON DELETE SET NULL ON UPDATE CASCADE;
