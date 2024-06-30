/*
  Warnings:

  - A unique constraint covering the columns `[tgId]` on the table `UserData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sumOfProductPrices` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `UserData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageCode` to the `UserData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `UserData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tgId` to the `UserData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `UserData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "sumOfProductPrices" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserData" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "languageCode" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "tgId" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserData_tgId_key" ON "UserData"("tgId");
