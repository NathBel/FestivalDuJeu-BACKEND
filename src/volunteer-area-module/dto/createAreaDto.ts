import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAreaDto{

    @IsNotEmpty()
    @IsInt()
    idZoneBenevole: number;

    @IsNotEmpty()
    @IsString()
    nomZoneBenevole: string;

    @IsNotEmpty()
    @IsInt()
    capacite: number;

    @IsNotEmpty()
    @IsInt()
    idFestival: number;

    @IsOptional()
    @IsString()
    Jeux?: string;

    @IsOptional()
    @IsString()
    Inscriptions?: string;

    @IsOptional()
    @IsString()
    Benevoles?: string;

}