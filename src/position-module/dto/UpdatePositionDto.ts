import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdatePositionDto {
    @IsOptional()
    @IsString()
    nomPoste?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    capacite?: number;
}