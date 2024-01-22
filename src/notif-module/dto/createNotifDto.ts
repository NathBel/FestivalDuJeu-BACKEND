import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class CreateNotifDto{

    @IsNotEmpty()
    @IsInt()
    idFestival: number;

    @IsNotEmpty()
    @IsString()
    TexteNotification: string;

    @IsNotEmpty()
    @IsString()
    Type: string;

    DateEnvoi: Date;

}