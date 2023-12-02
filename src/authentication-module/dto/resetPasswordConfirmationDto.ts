import { IsString, IsInt, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';


export class ResetPasswordConfirmationDto {
    @IsNotEmpty()
    @IsEmail()
    readonly Email: string;

    @IsNotEmpty()
    @IsString()
    readonly Password: string;

    @IsNotEmpty()
    readonly code: string;
}