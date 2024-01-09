-- CreateTable
CREATE TABLE "Festival" (
    "idFestival" SERIAL NOT NULL,
    "NomFestival" TEXT NOT NULL,
    "DateDebut" TIMESTAMP(3) NOT NULL,
    "DateFin" TIMESTAMP(3) NOT NULL,
    "Ville" TEXT,

    CONSTRAINT "Festival_pkey" PRIMARY KEY ("idFestival")
);

-- CreateTable
CREATE TABLE "Association" (
    "idAssociation" SERIAL NOT NULL,
    "NomAssociation" TEXT NOT NULL,
    "Mail" TEXT,

    CONSTRAINT "Association_pkey" PRIMARY KEY ("idAssociation")
);

-- CreateTable
CREATE TABLE "ZoneBenevole" (
    "idZoneBenevole" INTEGER NOT NULL,
    "nomZoneBenevole" TEXT NOT NULL,
    "capacite" INTEGER NOT NULL,
    "idFestival" INTEGER NOT NULL,

    CONSTRAINT "ZoneBenevole_pkey" PRIMARY KEY ("idZoneBenevole")
);

-- CreateTable
CREATE TABLE "Poste" (
    "idPoste" SERIAL NOT NULL,
    "nomPoste" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Poste_pkey" PRIMARY KEY ("idPoste")
);

-- CreateTable
CREATE TABLE "Benevole" (
    "idBenevole" SERIAL NOT NULL,
    "Pseudo" TEXT NOT NULL,
    "Nom" TEXT ,
    "Prenom" TEXT ,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "TailletTShirt" TEXT ,
    "Regime" TEXT ,
    "StatutHebergement" TEXT ,
    "NombreEditionPrecedente" INTEGER ,
    "Adresse" TEXT,
    "Ville" TEXT,
    "CodePostal" TEXT,
    "Telephone" TEXT,
    "JeuPrefere" TEXT,
    "idAssociation" INTEGER,

    CONSTRAINT "Benevole_pkey" PRIMARY KEY ("idBenevole")
);

-- CreateTable
CREATE TABLE "Jeux" (
    "idJeux" INTEGER NOT NULL,
    "NomJeu" TEXT NOT NULL,
    "Editeur" TEXT NOT NULL,
    "TypePublic" TEXT NOT NULL,
    "Animation" BOOLEAN NOT NULL,
    "Recu" BOOLEAN NOT NULL,
    "LienNotice" TEXT NOT NULL,
    "LienVideoExplicative" TEXT NOT NULL,
    "idZoneBenevole" INTEGER NOT NULL,

    CONSTRAINT "Jeux_pkey" PRIMARY KEY ("idJeux")
);

-- CreateTable
CREATE TABLE "Inscription" (
    "idBenevole" INTEGER NOT NULL,
    "idZoneBenevole" INTEGER NOT NULL,
    "idPoste" INTEGER NOT NULL,
    "Creneau" TEXT NOT NULL,
    "Jour" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inscription_pkey" PRIMARY KEY ("idBenevole","idPoste","Creneau","Jour")
);

-- CreateTable
CREATE TABLE "EtreReferent" (
    "idBenevole" INTEGER NOT NULL,
    "idPoste" INTEGER NOT NULL,

    CONSTRAINT "EtreReferent_pkey" PRIMARY KEY ("idBenevole","idPoste")
);

-- CreateTable
CREATE TABLE "Employer" (
    "idFestival" INTEGER NOT NULL,
    "idPoste" INTEGER NOT NULL,

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("idFestival","idPoste")
);

-- CreateTable
CREATE TABLE "_BenevoleToZoneBenevole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BenevoleToPoste" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BenevoleToZoneBenevole_AB_unique" ON "_BenevoleToZoneBenevole"("A", "B");

-- CreateIndex
CREATE INDEX "_BenevoleToZoneBenevole_B_index" ON "_BenevoleToZoneBenevole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BenevoleToPoste_AB_unique" ON "_BenevoleToPoste"("A", "B");

-- CreateIndex
CREATE INDEX "_BenevoleToPoste_B_index" ON "_BenevoleToPoste"("B");

-- AddForeignKey
ALTER TABLE "ZoneBenevole" ADD CONSTRAINT "ZoneBenevole_idFestival_fkey" FOREIGN KEY ("idFestival") REFERENCES "Festival"("idFestival") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benevole" ADD CONSTRAINT "Benevole_idAssociation_fkey" FOREIGN KEY ("idAssociation") REFERENCES "Association"("idAssociation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jeux" ADD CONSTRAINT "Jeux_idZoneBenevole_fkey" FOREIGN KEY ("idZoneBenevole") REFERENCES "ZoneBenevole"("idZoneBenevole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_idBenevole_fkey" FOREIGN KEY ("idBenevole") REFERENCES "Benevole"("idBenevole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_idZoneBenevole_fkey" FOREIGN KEY ("idZoneBenevole") REFERENCES "ZoneBenevole"("idZoneBenevole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_idPoste_fkey" FOREIGN KEY ("idPoste") REFERENCES "Poste"("idPoste") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtreReferent" ADD CONSTRAINT "EtreReferent_idBenevole_fkey" FOREIGN KEY ("idBenevole") REFERENCES "Benevole"("idBenevole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtreReferent" ADD CONSTRAINT "EtreReferent_idPoste_fkey" FOREIGN KEY ("idPoste") REFERENCES "Poste"("idPoste") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_idFestival_fkey" FOREIGN KEY ("idFestival") REFERENCES "Festival"("idFestival") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_idPoste_fkey" FOREIGN KEY ("idPoste") REFERENCES "Poste"("idPoste") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BenevoleToZoneBenevole" ADD CONSTRAINT "_BenevoleToZoneBenevole_A_fkey" FOREIGN KEY ("A") REFERENCES "Benevole"("idBenevole") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BenevoleToZoneBenevole" ADD CONSTRAINT "_BenevoleToZoneBenevole_B_fkey" FOREIGN KEY ("B") REFERENCES "ZoneBenevole"("idZoneBenevole") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BenevoleToPoste" ADD CONSTRAINT "_BenevoleToPoste_A_fkey" FOREIGN KEY ("A") REFERENCES "Benevole"("idBenevole") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BenevoleToPoste" ADD CONSTRAINT "_BenevoleToPoste_B_fkey" FOREIGN KEY ("B") REFERENCES "Poste"("idPoste") ON DELETE CASCADE ON UPDATE CASCADE;
