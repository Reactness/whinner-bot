/*
  Warnings:

  - Made the column `user` on table `Dialogue` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Dialogue" DROP CONSTRAINT "Dialogue_user_fkey";

-- AlterTable
ALTER TABLE "Dialogue" ALTER COLUMN "user" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Dialogue" ADD CONSTRAINT "Dialogue_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
