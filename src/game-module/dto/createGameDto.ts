import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateGameDto {

    @IsNotEmpty()
    @IsInt()
    readonly idJeux: number;

    @IsNotEmpty()
    readonly NomJeu: string;

    @IsOptional()
    readonly Auteur: string;

    @IsOptional()
    readonly Editeur: string;

    @IsOptional()
    readonly NbJoueurs: string;

    @IsOptional()
    readonly AgeMin: string;

    @IsOptional()
    readonly Duree: string;

    @IsOptional()
    readonly TypePublic: string;

    @IsOptional()
    readonly LienNotice: string;

    @IsOptional()
    readonly Animation: string;

    @IsOptional()
    readonly Recu: string;

    @IsOptional()
    readonly Mecanisme: string;

    @IsOptional()
    readonly Theme: string;

    @IsOptional()
    readonly Tags: string;

    @IsOptional()
    readonly Description: string;
    
    @IsOptional()
    readonly LienVideoExplicative: string;

    @IsInt()
    readonly idZoneBenevole: number;
}