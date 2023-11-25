/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `Benevole` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Jeux" DROP CONSTRAINT "Jeux_idZoneBenevole_fkey";

-- AlterTable
ALTER TABLE "Jeux" ALTER COLUMN "idZoneBenevole" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Benevole_Email_key" ON "Benevole"("Email");

-- AddForeignKey
ALTER TABLE "Jeux" ADD CONSTRAINT "Jeux_idZoneBenevole_fkey" FOREIGN KEY ("idZoneBenevole") REFERENCES "ZoneBenevole"("idZoneBenevole") ON DELETE SET NULL ON UPDATE CASCADE;
