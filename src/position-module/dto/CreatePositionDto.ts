import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

/*/ Poste model
model Poste {
    idPoste       Int       @id @default(autoincrement())
    nomPoste      String
    description   String
    
  
    // Relations
    Benevoles     Benevole[]
    Employers     Employer[]
    EtreReferents EtreReferent[]
    Inscriptions  Inscription[]
  }*/

export class CreatePositionDto {
    @IsNotEmpty()
    @IsString()
    nomPoste: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsInt()
    capacite: number;
}