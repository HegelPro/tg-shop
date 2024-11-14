/*
  Warnings:

  - You are about to drop the column `currency` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `sumOfProductPrices` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfproduct` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tgId` on the `UserData` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserData_tgId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "currency",
DROP COLUMN "sumOfProductPrices";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currency",
DROP COLUMN "numberOfproduct";

-- AlterTable
ALTER TABLE "ProductCategory" ALTER COLUMN "pluralName" DROP DEFAULT,
ALTER COLUMN "singleName" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "tgId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "languageCode" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;
DROP SEQUENCE "UserData_id_seq";
