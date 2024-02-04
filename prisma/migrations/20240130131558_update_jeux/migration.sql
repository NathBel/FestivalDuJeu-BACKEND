/*
  Warnings:

  - Added the required column `AgeMin` to the `Jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Auteur` to the `Jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Duree` to the `Jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Mecanisme` to the `Jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NbJoueurs` to the `Jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Tags` to the `Jeux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Theme` to the `Jeux` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jeux" ADD COLUMN     "AgeMin" INTEGER NOT NULL,
ADD COLUMN     "Auteur" TEXT NOT NULL,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "Duree" INTEGER NOT NULL,
ADD COLUMN     "Mecanisme" TEXT NOT NULL,
ADD COLUMN     "NbJoueurs" INTEGER NOT NULL,
ADD COLUMN     "Tags" TEXT NOT NULL,
ADD COLUMN     "Theme" TEXT NOT NULL;
