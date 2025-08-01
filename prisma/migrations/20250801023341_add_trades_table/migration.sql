/*
  Warnings:

  - Added the required column `updatedAt` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Trades" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "portfolioId" UUID NOT NULL,
    "symbol" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "entryDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entryPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "exitPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "lotSize" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "pnl" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
