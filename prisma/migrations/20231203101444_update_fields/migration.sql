/*
  Warnings:

  - Added the required column `capacite` to the `Poste` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poste" ADD COLUMN     "capacite" INTEGER NOT NULL;
