-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_user_fkey";

-- DropIndex
DROP INDEX "Message_user_key";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "user" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("userName") ON DELETE SET NULL ON UPDATE CASCADE;
