-- AlterTable
ALTER TABLE "Jeux" ALTER COLUMN "Editeur" DROP NOT NULL,
ALTER COLUMN "TypePublic" DROP NOT NULL,
ALTER COLUMN "Animation" DROP NOT NULL,
ALTER COLUMN "Recu" DROP NOT NULL,
ALTER COLUMN "LienNotice" DROP NOT NULL,
ALTER COLUMN "LienVideoExplicative" DROP NOT NULL,
ALTER COLUMN "AgeMin" DROP NOT NULL,
ALTER COLUMN "Auteur" DROP NOT NULL,
ALTER COLUMN "Description" DROP NOT NULL,
ALTER COLUMN "Duree" DROP NOT NULL,
ALTER COLUMN "Mecanisme" DROP NOT NULL,
ALTER COLUMN "NbJoueurs" DROP NOT NULL,
ALTER COLUMN "Tags" DROP NOT NULL,
ALTER COLUMN "Theme" DROP NOT NULL;
