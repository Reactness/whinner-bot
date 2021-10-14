/*
  Warnings:

  - You are about to drop the `Dialogue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dialogue" DROP CONSTRAINT "Dialogue_user_fkey";

-- DropTable
DROP TABLE "Dialogue";

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "response" TEXT,
    "message" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_user_key" ON "Message"("user");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
