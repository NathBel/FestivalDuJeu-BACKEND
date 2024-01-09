/*
  Warnings:

  - You are about to drop the column `Pseudo` on the `Benevole` table. All the data in the column will be lost.
  - Made the column `Nom` on table `Benevole` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Prenom` on table `Benevole` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TailletTShirt` on table `Benevole` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Regime` on table `Benevole` required. This step will fail if there are existing NULL values in that column.
  - Made the column `StatutHebergement` on table `Benevole` required. This step will fail if there are existing NULL values in that column.
  - Made the column `NombreEditionPrecedente` on table `Benevole` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Benevole" DROP COLUMN "Pseudo",
ALTER COLUMN "Nom" SET NOT NULL,
ALTER COLUMN "Prenom" SET NOT NULL,
ALTER COLUMN "TailletTShirt" SET NOT NULL,
ALTER COLUMN "Regime" SET NOT NULL,
ALTER COLUMN "StatutHebergement" SET NOT NULL,
ALTER COLUMN "NombreEditionPrecedente" SET NOT NULL;
