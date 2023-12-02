import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateAssociationDto{

    @IsNotEmpty()
    @IsString()
    NomAssociation: string;

    @IsOptional()
    @IsString()
    Mail?: string;
}