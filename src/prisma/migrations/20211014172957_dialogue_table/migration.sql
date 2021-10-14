/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Context" AS ENUM ('USER', 'BOT');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Dialogue" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "from" "Context",
    "to" "Context",
    "dialogue" JSONB DEFAULT E'{}',

    CONSTRAINT "Dialogue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dialogue" ADD CONSTRAINT "Dialogue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
