import { IsString, IsInt, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SigninDto {

    @IsNotEmpty()
    @IsEmail()
    readonly Email: string;

    @IsNotEmpty()
    @IsString()
    readonly Password: string;

}