-- AlterTable
CREATE SEQUENCE zonebenevole_idzonebenevole_seq;
ALTER TABLE "ZoneBenevole" ALTER COLUMN "idZoneBenevole" SET DEFAULT nextval('zonebenevole_idzonebenevole_seq'),
ALTER COLUMN "idPoste" DROP DEFAULT;
ALTER SEQUENCE zonebenevole_idzonebenevole_seq OWNED BY "ZoneBenevole"."idZoneBenevole";
