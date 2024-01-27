import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';

@Injectable()
export class VolunteerAreaModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createArea(createAreaDto: any){

        //Check if foreign key idFestival exists
        const festival = await this.prismaService.festival.findUnique({
            where: {
                idFestival: createAreaDto.idFestival
            }
        });

        //Check if area already exists
        const area = await this.prismaService.zoneBenevole.findUnique({
            where: {
                idZoneBenevole: createAreaDto.idZoneBenevole
            }
        });

        if(area){
            throw new ConflictException(`Area with id ${createAreaDto.idZoneBenevole} already exists`);
        }

        if(!festival){
            throw new NotFoundException(`Festival with id ${createAreaDto.idFestival} not found`);
        }
        

        return this.prismaService.zoneBenevole.create({
            data: createAreaDto
        });
    }

    async getAllArea(){
        return this.prismaService.zoneBenevole.findMany();
    }

    async getAreaById(idArea: number){
        //Check if area exists
        const area = await this.prismaService.zoneBenevole.findUnique({
            where: {
                idZoneBenevole: idArea
            }
        });

        if(!area){
            throw new Error(`Area with id ${idArea} not found`);
        }

        return area;
    }

    async updateArea(idArea: number, updateAreaDto: any){
        //Check if area exists
        const area = await this.prismaService.zoneBenevole.findUnique({
            where: {
                idZoneBenevole: idArea
            }
        });

        if(!area){
            throw new Error(`Area with id ${idArea} not found`);
        }

        return this.prismaService.zoneBenevole.update({
            where: {
                idZoneBenevole: idArea
            },
            data: updateAreaDto
        });
    }

    async deleteArea(idArea: number){
        //Check if area exists
        const area = await this.prismaService.zoneBenevole.findUnique({
            where: {
                idZoneBenevole: idArea
            }
        });

        if(!area){
            throw new Error(`Area with id ${idArea} not found`);
        }

        return this.prismaService.zoneBenevole.delete({
            where: {
                idZoneBenevole: idArea
            }
        });
    }

}
