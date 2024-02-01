import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthorizedDto{

    @IsString()
    @IsNotEmpty()
    readonly Token: string;
    
    @IsString()
    @IsNotEmpty()
    readonly RoleAuthorized: string;


}