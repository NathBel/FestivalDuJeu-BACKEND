/*
  Warnings:

  - The primary key for the `Inscription` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Inscription" DROP CONSTRAINT "Inscription_idZoneBenevole_fkey";

-- AlterTable
ALTER TABLE "Inscription" DROP CONSTRAINT "Inscription_pkey",
ALTER COLUMN "idZoneBenevole" DROP NOT NULL,
ADD CONSTRAINT "Inscription_pkey" PRIMARY KEY ("idBenevole", "idPoste", "Creneau", "Jour");

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_idZoneBenevole_fkey" FOREIGN KEY ("idZoneBenevole") REFERENCES "ZoneBenevole"("idZoneBenevole") ON DELETE SET NULL ON UPDATE CASCADE;
