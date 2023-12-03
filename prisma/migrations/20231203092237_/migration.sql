/*
  Warnings:

  - The `Role` column on the `Benevole` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `isPresent` to the `Inscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin', 'Referent');

-- AlterTable
ALTER TABLE "Benevole" DROP COLUMN "Role",
ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'User';

-- AlterTable
ALTER TABLE "Inscription" ADD COLUMN     "isPresent" BOOLEAN NOT NULL;
