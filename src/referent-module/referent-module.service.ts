import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';

@Injectable()
export class ReferentModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createReferent(createReferentDto: any){

        const {idBenevole, idPoste} = createReferentDto;

        //Check if foreign key idVolunteer exists
        const volunteer = await this.prismaService.benevole.findUnique({
            where: {
                idBenevole: createReferentDto.idBenevole
            }
        });

        //Check if foreign key idPosition exists
        const poste = await this.prismaService.poste.findUnique({
            where: {
                idPoste: createReferentDto.idPoste
            }
        });


        if(!volunteer){
            throw new NotFoundException(`Volunteer with id ${createReferentDto.idBenevole} not found`);
        }

        if(!poste){
            throw new NotFoundException(`Poste with id ${createReferentDto.idPoste} not found`);
        }

        return this.prismaService.etreReferent.create({
            data: createReferentDto
        });
    }

    async getAllReferents(){
        return this.prismaService.etreReferent.findMany();
    }

    async getAllReferentsByIdBenevole(idBenevole: number){
        return this.prismaService.etreReferent.findMany({
            where: {
                idBenevole: idBenevole
            }
        });
    }

    async getAllReferentsByIdPoste(idPoste: number){
        return this.prismaService.etreReferent.findMany({
            where: {
                idPoste: idPoste
            }
        });
    }

    async getReferentByIdBenevoleIdReferent(idBenevole: number, idPoste: number){
        return this.prismaService.etreReferent.findFirst({
            where: {
                idBenevole: idBenevole,
                idPoste: idPoste
            }
        });
    }

    async updateReferent(idBenevole: number, idPoste: number, updateReferentDto: any){

        //Check if foreign key idVolunteer exists
        const volunteer = await this.prismaService.benevole.findUnique({
            where: {
                idBenevole: updateReferentDto.idBenevole
            }
        });

        //Check if foreign key idPosition exists
        const poste = await this.prismaService.poste.findUnique({
            where: {
                idPoste: updateReferentDto.idPoste
            }
        });

        if(!volunteer){
            throw new NotFoundException(`Volunteer with id ${updateReferentDto.idBenevole} not found`);
        }

        if(!poste){
            throw new NotFoundException(`Position with id ${updateReferentDto.idPoste} not found`);
        }

        return this.prismaService.etreReferent.update({
            where: {
                idBenevole_idPoste: {
                    idBenevole: idBenevole,
                    idPoste: idPoste
                }
            },
            data: updateReferentDto
        });
    }

    async deleteReferent(idBenevole: number, idPoste: number){
        return this.prismaService.etreReferent.delete({
            where: {
                idBenevole_idPoste: {
                    idBenevole: idBenevole,
                    idPoste: idPoste
                }
            }
        });
    }

}
