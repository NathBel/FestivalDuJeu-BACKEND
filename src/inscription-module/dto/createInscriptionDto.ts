import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateInscriptionDto {

    @IsNotEmpty()
    @IsInt()
    idBenevole: number;

    @IsNotEmpty()
    @IsInt()
    idPoste: number;

    @IsNotEmpty()
    @IsString()
    Creneau: string;

    @IsNotEmpty()
    @IsString()
    Jour: string;

    @IsOptional()
    @IsBoolean()
    isPresent?: string;

    @IsOptional()
    @IsInt()
    idZoneBenevole: number;
}