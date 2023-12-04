import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmployerDto{

    @IsNotEmpty()
    @IsInt()
    idFestival: number;

    @IsNotEmpty()
    @IsInt()
    idPoste: number;


}