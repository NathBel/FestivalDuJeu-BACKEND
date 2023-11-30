-- DropForeignKey
ALTER TABLE "Benevole" DROP CONSTRAINT "Benevole_idAssociation_fkey";

-- AlterTable
ALTER TABLE "Benevole" ALTER COLUMN "idAssociation" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Benevole" ADD CONSTRAINT "Benevole_idAssociation_fkey" FOREIGN KEY ("idAssociation") REFERENCES "Association"("idAssociation") ON DELETE SET NULL ON UPDATE CASCADE;
