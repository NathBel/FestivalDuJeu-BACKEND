/*
  Warnings:

  - A unique constraint covering the columns `[NomAssociation]` on the table `Association` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Association_NomAssociation_key" ON "Association"("NomAssociation");
