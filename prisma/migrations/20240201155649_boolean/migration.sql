-- AlterTable
ALTER TABLE "Jeux" ADD COLUMN     "AgeMin" TEXT,
ADD COLUMN     "Auteur" TEXT,
ADD COLUMN     "Description" TEXT,
ADD COLUMN     "Duree" TEXT,
ADD COLUMN     "Mecanisme" TEXT,
ADD COLUMN     "NbJoueurs" TEXT,
ADD COLUMN     "Tags" TEXT,
ADD COLUMN     "Theme" TEXT,
ALTER COLUMN "Editeur" DROP NOT NULL,
ALTER COLUMN "TypePublic" DROP NOT NULL,
ALTER COLUMN "Animation" DROP NOT NULL,
ALTER COLUMN "Animation" SET DATA TYPE TEXT,
ALTER COLUMN "Recu" DROP NOT NULL,
ALTER COLUMN "Recu" SET DATA TYPE TEXT,
ALTER COLUMN "LienNotice" DROP NOT NULL,
ALTER COLUMN "LienVideoExplicative" DROP NOT NULL;