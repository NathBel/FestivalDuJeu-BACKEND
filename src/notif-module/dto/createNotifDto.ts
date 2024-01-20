import { IsNotEmpty, IsString } from "class-validator";


export class CreateNotifDto{

    @IsNotEmpty()
    @IsString()
    NomNotification: string;

    @IsNotEmpty()
    DateEnvoi: Date;

    @IsNotEmpty()
    @IsString()
    Type : string;

}