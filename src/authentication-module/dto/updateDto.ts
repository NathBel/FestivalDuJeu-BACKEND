import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateDto {

    @IsOptional()
    @IsString()
    readonly Pseudo?: string;


    @IsOptional()
    @IsString()
    readonly Nom?: string;

    @IsOptional()
    @IsString()
    readonly Prenom?: string;

    @IsOptional()
    @IsEmail()
    readonly Email?: string;

    @IsOptional()
    @IsString()
    readonly TailletTShirt?: string;

    @IsOptional()
    @IsString()
    readonly Regime?: string;

    @IsOptional()
    @IsString()
    readonly StatutHebergement?: string;

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