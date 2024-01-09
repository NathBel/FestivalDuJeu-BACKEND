/*
  Warnings:

  - A unique constraint covering the columns `[Pseudo]` on the table `Benevole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Pseudo` to the `Benevole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Benevole" ADD COLUMN     "Pseudo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Benevole_Pseudo_key" ON "Benevole"("Pseudo");
