import { IsString, IsInt, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRoleDto {


    @IsNotEmpty()
    @IsString()
    readonly Role: string;

}