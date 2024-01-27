-- AlterTable
ALTER TABLE "ZoneBenevole" ADD COLUMN     "idPoste" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "ZoneBenevole" ADD CONSTRAINT "ZoneBenevole_idPoste_fkey" FOREIGN KEY ("idPoste") REFERENCES "Poste"("idPoste") ON DELETE RESTRICT ON UPDATE CASCADE;
