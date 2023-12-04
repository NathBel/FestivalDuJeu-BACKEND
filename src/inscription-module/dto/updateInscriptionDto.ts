import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateInscriptionDto {

    @IsOptional()
    @IsInt()
    idBenevole?: number;

    @IsOptional()
    @IsInt()
    idPoste?: number;

    @IsOptional()
    @IsString()
    Creneau?: string;

    @IsOptional()
    @IsString()
    Jour?: string;

    @IsOptional()
    @IsBoolean()
    isPresent?: string;

    @IsOptional()
    @IsInt()
    idZoneBenevole?: number;
}