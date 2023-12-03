import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAreaDto{

    @IsOptional()
    @IsInt()
    idZoneBenevole?: number;

    @IsOptional()
    @IsString()
    nomZoneBenevole?: string;

    @IsOptional()
    @IsInt()
    capacite?: number;

    @IsOptional()
    @IsInt()
    idFestival?: number;

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