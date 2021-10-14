-- DropIndex
DROP INDEX "Message_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
CREATE SEQUENCE "message_id_seq";
ALTER TABLE "Message" ALTER COLUMN "id" SET DEFAULT nextval('message_id_seq'),
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE "message_id_seq" OWNED BY "Message"."id";

-- AlterTable
CREATE SEQUENCE "user_id_seq";
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE "user_id_seq" OWNED BY "User"."id";
