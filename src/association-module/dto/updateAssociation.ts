import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class UpdateAssociationDto{

    @IsOptional()
    @IsString()
    NomAssociation?: string;

    @IsOptional()
    @IsString()
    Mail?: string;
}