-- CreateTable
CREATE TABLE "Cache" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "parameter" INTEGER NOT NULL,
    "is_expired" BOOLEAN NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Cache_pkey" PRIMARY KEY ("id")
);
