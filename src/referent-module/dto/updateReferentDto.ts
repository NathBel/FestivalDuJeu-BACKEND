import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateReferentDto{

    @IsOptional()
    @IsInt()
    idBenevole?: number;

    @IsOptional()
    @IsInt()
    idPoste?: number;

}