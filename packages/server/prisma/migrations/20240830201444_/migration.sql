/*
  Warnings:

  - You are about to drop the column `name` on the `ProductCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[singleName]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pluralName]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductCategory_name_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ADD COLUMN     "shortDescrition" TEXT;

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "name",
ADD COLUMN     "pluralName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "singleName" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_singleName_key" ON "ProductCategory"("singleName");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_pluralName_key" ON "ProductCategory"("pluralName");
