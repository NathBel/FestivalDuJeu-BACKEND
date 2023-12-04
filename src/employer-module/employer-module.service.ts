import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';

@Injectable()
export class EmployerModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createEmployer(createEmployerDto: any){

        const {idFestival, idPoste} = createEmployerDto;

        //Check if foreign key idFestival exists
        const festival = await this.prismaService.festival.findUnique({
            where: {
                idFestival: createEmployerDto.idFestival
            }
        });

        //Check if foreign key idPosition exists
        const poste = await this.prismaService.poste.findUnique({
            where: {
                idPoste: createEmployerDto.idPoste
            }
        });

        if(!festival){
            throw new NotFoundException(`Festival with id ${createEmployerDto.idFestival} not found`);
        }

        if(!poste){
            throw new NotFoundException(`Poste with id ${createEmployerDto.idPoste} not found`);
        }

        return this.prismaService.employer.create({
            data: createEmployerDto
        });

    }

    async getAllEmployers(){
        return this.prismaService.employer.findMany();
    }

    async getAllEmployersByIdFestival(idFestival: number){
        return this.prismaService.employer.findMany({
            where: {
                idFestival: idFestival
            }
        });
    }

    async getAllEmployersByIdPoste(idPoste: number){
        return this.prismaService.employer.findMany({
            where: {
                idPoste: idPoste
            }
        });
    }

    async getEmployerByIdFestivalIdPoste(idFestival: number, idPoste: number){
        const employer = await this.prismaService.employer.findUnique({
            where: {
                idFestival_idPoste: {
                    idFestival: idFestival,
                    idPoste: idPoste
                }
            }
        });

        if(!employer){
            throw new NotFoundException(`Employer with idFestival ${idFestival} and idEmployer ${idPoste} not found`);
        }

        return employer;
    }

    async updateEmployer(idFestival: number, idPoste: number, updateEmployerDto: any){

        //Check if foreign key idFestival exists
        const festival = await this.prismaService.festival.findUnique({
            where: {
                idFestival: idFestival
            }
        });

        //Check if foreign key idPosition exists
        const poste = await this.prismaService.poste.findUnique({
            where: {
                idPoste: idPoste
            }
        });

        if(!festival){
            throw new NotFoundException(`Festival with id ${idFestival} not found`);
        }

        if(!poste){
            throw new NotFoundException(`Poste with id ${idPoste} not found`);
        }

        return this.prismaService.employer.update({
            where: {
                idFestival_idPoste: {
                    idFestival: idFestival,
                    idPoste: idPoste
                }
            },
            data: updateEmployerDto
        });
    }

    async deleteEmployer(idFestival: number, idPoste: number){

        //Check if record exists in database
        const employer = await this.prismaService.employer.findUnique({
            where: {
                idFestival_idPoste: {
                    idFestival: idFestival,
                    idPoste: idPoste
                }
            }
        });

        if(!employer){
            throw new NotFoundException(`Employer with idFestival ${idFestival} and idPoste ${idPoste} not found`);
        }

        return this.prismaService.employer.delete({
            where: {
                idFestival_idPoste: {
                    idFestival: idFestival,
                    idPoste: idPoste
                }
            }
        });
    }
}
