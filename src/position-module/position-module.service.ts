import { Injectable } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';

@Injectable()
export class PositionModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createPosition(createPositionDto: any){

        return this.prismaService.poste.create({
            data: createPositionDto
        });
    }

    async getAllPosition(){
        return this.prismaService.poste.findMany();
    }


    async getPositionById(idPosition: number){
        //Check if position exists
        const position = await this.prismaService.poste.findUnique({
            where: {
                idPoste: idPosition
            }
        });

        if(!position){
            throw new Error(`Position with id ${idPosition} not found`);
        }

        return position;
    }

    async updatePosition(idPosition: number, updatePositionDto: any){
        //Check if position exists
        const position = await this.prismaService.poste.findUnique({
            where: {
                idPoste: idPosition
            }
        });

        if(!position){
            throw new Error(`Position with id ${idPosition} not found`);
        }

        return this.prismaService.poste.update({
            where: {
                idPoste: idPosition
            },
            data: updatePositionDto
        });
    }

    async deletePosition(idPosition: number){
        //Check if position exists
        const position = await this.prismaService.poste.findUnique({
            where: {
                idPoste: idPosition
            }
        });

        if(!position){
            throw new Error(`Position with id ${idPosition} not found`);
        }

        return this.prismaService.poste.delete({
            where: {
                idPoste: idPosition
            }
        });
    }
}
