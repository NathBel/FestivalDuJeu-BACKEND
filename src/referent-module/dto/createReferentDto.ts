import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReferentDto{

    @IsNotEmpty()
    @IsInt()
    idBenevole: number;

    @IsNotEmpty()
    @IsInt()
    idPoste: number;


}