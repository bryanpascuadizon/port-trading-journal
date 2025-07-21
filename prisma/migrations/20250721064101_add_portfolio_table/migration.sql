-- CreateTable
CREATE TABLE "Portfolio" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "broker" TEXT NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "isDefault" BOOLEAN NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);
