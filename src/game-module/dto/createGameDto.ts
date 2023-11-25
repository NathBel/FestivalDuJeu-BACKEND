import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateGameDto {

    @IsNotEmpty()
    @IsInt()
    readonly idJeux: number;

    @IsNotEmpty()
    readonly NomJeu: string;

    @IsNotEmpty()
    readonly Editeur: string;

    @IsNotEmpty()
    readonly TypePublic: string;

    @IsNotEmpty()
    readonly Animation: boolean;

    @IsNotEmpty()
    readonly Recu: boolean;

    readonly LienNotice: string;

    readonly LienVideoExplicative: string;

    @IsInt()
    readonly idZoneBenevole: number;
}