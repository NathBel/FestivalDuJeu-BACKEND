import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class UpdateGameDto {


    @IsInt()
    @IsOptional()
    readonly idJeux?: number;
    
    @IsNotEmpty()
    @IsOptional()
    readonly NomJeu?: string;

    @IsNotEmpty()
    @IsOptional()
    readonly Editeur?: string;

    @IsNotEmpty()
    @IsOptional()
    readonly TypePublic?: string;

    @IsNotEmpty()
    @IsOptional()
    readonly Animation?: boolean;

    @IsNotEmpty()
    @IsOptional()
    readonly Recu?: boolean;

    @IsOptional()
    readonly LienNotice?: string;

    @IsOptional()
    readonly LienVideoExplicative?: string;

}