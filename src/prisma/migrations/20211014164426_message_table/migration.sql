-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER,
    "message" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
