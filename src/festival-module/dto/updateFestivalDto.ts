import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateFestivalDto{

    @IsOptional()
    @IsString()
    NomFestival?: string;

    @IsOptional()
    DateDebut?: Date;

    @IsOptional()
    DateFin?: Date;

    @IsOptional()
    @IsString()
    Ville?: string;

}