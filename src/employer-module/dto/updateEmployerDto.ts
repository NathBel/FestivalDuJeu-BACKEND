import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEmployerDto{

    @IsOptional()
    @IsInt()
    idFestival?: number;

    @IsOptional()
    @IsInt()
    idPoste?: number;

}