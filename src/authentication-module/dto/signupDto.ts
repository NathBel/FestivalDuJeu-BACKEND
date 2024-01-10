import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupDto {

    @IsNotEmpty()
    @IsString()
    readonly Pseudo: string;

    @IsOptional()
    @IsString()
    readonly Nom: string;

    @IsOptional()
    @IsString()
    readonly Prenom: string;

    @IsNotEmpty()
    @IsEmail()
    readonly Email: string;

    @IsNotEmpty()
    @IsString()
    readonly Password: string;

    @IsOptional()
    @IsString()
    readonly Role: string;

    @IsOptional()
    @IsString()
    readonly TailletTShirt: string;

    @IsOptional()
    @IsString()
    readonly Regime: string;

    @IsOptional()
    @IsString()
    readonly StatutHebergement: string;

    @IsOptional()
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