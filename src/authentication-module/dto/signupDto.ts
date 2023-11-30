import { IsString, IsInt, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignupDto {


    @IsNotEmpty()
    @IsString()
    readonly Nom: string;

    @IsNotEmpty()
    @IsString()
    readonly Prenom: string;

    @IsNotEmpty()
    @IsEmail()
    readonly Email: string;

    @IsNotEmpty()
    @IsString()
    readonly Password: string;

    @IsNotEmpty()
    @IsString()
    readonly Role: string;

    @IsNotEmpty()
    @IsString()
    readonly TailletTShirt: string;

    @IsNotEmpty()
    @IsString()
    readonly Regime: string;

    @IsNotEmpty()
    @IsString()
    readonly StatutHebergement: string;

    @IsNotEmpty()
    @IsInt()
    readonly NombreEditionPrecedente: number;

    @IsOptional()
    @IsString()
    readonly Adresse?: string;

    @IsOptional()
    @IsString()
    readonly Ville?: string;

    @IsOptional()
    @IsString()
    readonly CodePostal?: string;

    @IsOptional()
    @IsString()
    readonly Telephone?: string;

    @IsOptional()
    @IsString()
    readonly JeuPrefere?: string;

}