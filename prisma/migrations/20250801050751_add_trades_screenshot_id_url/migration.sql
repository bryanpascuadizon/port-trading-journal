/*
  Warnings:

  - You are about to drop the column `screenshot` on the `Trades` table. All the data in the column will be lost.
  - Added the required column `screenshotId` to the `Trades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenshotUrl` to the `Trades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trades" DROP COLUMN "screenshot",
ADD COLUMN     "screenshotId" TEXT NOT NULL,
ADD COLUMN     "screenshotUrl" TEXT NOT NULL;
