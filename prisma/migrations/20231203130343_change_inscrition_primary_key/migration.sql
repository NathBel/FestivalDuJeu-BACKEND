/*
  Warnings:

  - The primary key for the `Inscription` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Inscription" DROP CONSTRAINT "Inscription_pkey",
ADD CONSTRAINT "Inscription_pkey" PRIMARY KEY ("idBenevole", "idPoste", "idZoneBenevole", "Creneau", "Jour");
