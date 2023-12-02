import { IsString, IsInt, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ResetPasswordDemandDto {

    @IsNotEmpty()
    @IsEmail()
    readonly Email: string;

}