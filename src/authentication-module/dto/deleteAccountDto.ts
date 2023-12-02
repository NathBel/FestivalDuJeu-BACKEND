import { IsNotEmpty } from "class-validator";

export class DeleteAccountDto {
    
    @IsNotEmpty()
    readonly Password: string;
}