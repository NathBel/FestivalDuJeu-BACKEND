import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateFestivalDto{

    @IsNotEmpty()
    @IsString()
    NomFestival: string;

    @IsNotEmpty()
    DateDebut: Date;

    @IsNotEmpty()
    DateFin: Date;

    @IsOptional()
    @IsString()
    Ville?: string;

}