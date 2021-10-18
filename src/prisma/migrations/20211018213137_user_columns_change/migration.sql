/*
  Warnings:

  - The `user` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_user_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "user",
ADD COLUMN     "user" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "telegramId" INTEGER,
ALTER COLUMN "userName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
