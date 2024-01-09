import { Injectable } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';

@Injectable()
export class FestivalModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createFestival(createFestivalDto) {
        const {NomFestival, DateDebut, DateFin, Ville} = createFestivalDto;

        //Check if dates are valid
        if(new Date(DateDebut) > new Date(DateFin)) {
            return {data: "Start date must be before end date"};
        }

        return this.prismaService.festival.create({
            data: {
                NomFestival,
                DateDebut: new Date(DateDebut),
                DateFin: new Date(DateFin),
                Ville
            }
        });

        
    }

    async getAllFestivals() {
        return await this.prismaService.festival.findMany();
    }

    async getFestival(id: number) {

        //Check if festival exists
        const festival = await this.prismaService.festival.findUnique({
            where: {
                idFestival: id
            }
        });

        if(!festival) {
            return {data: "Festival not found"};
        }

        return await this.prismaService.festival.findUnique({
            where: {
                idFestival: id
            }
        });
    }

    async updateFestival(id: number, updateFestivalDto) {
        const {NomFestival, DateDebut, DateFin, Ville} = updateFestivalDto;

        //Check if festival exists
        const festival = await this.prismaService.festival.findUnique({
            where: {
                idFestival: id
            }
        });

        if(!festival) {
            return {data: "Festival not found"};
        }

        //Check if dates are valid
        if(new Date(DateDebut) > new Date(DateFin)) {
            return {data: "Start date must be before end date"};
        }

        await this.prismaService.festival.update({
            where: {
                idFestival: id
            },
            data: {
                NomFestival,
                DateDebut: new Date(DateDebut),
                DateFin: new Date(DateFin),
                Ville
            }
        });

        return {data: "Festival successfully updated"};
    }

    async deleteFestival(id: number) {

        //Check if festival exists
        const festival = await this.prismaService.festival.findUnique({
            where: {
                idFestival: id
            }
        });

        if(!festival) {
            return {data: "Festival not found"};
        }
        
        await this.prismaService.festival.delete({
            where: {
                idFestival: id
            }
        });

        return {data: "Festival successfully deleted"};
    }
}
