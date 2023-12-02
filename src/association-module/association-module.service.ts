import { Injectable } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';

@Injectable()
export class AssociationModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createAssociation(createAssociationDto) {
        const {NomAssociation, Mail} = createAssociationDto;

        await this.prismaService.association.create({
            data: {
                NomAssociation,
                Mail
            }
        });

        return {data: "Association successfully created"};
    }

    async getAllAssociation() {
        return await this.prismaService.association.findMany();
    }

    async getOneAssociation(id: number) {
        return await this.prismaService.association.findUnique({
            where: {
                idAssociation: id
            }
        });
    }

    async updateAssociation(id: number, updateAssociationDto) {
        const {NomAssociation, Mail} = updateAssociationDto;

        await this.prismaService.association.update({
            where: {
                idAssociation: id
            },
            data: {
                NomAssociation,
                Mail
            }
        });

        return {data: "Association successfully updated"};
    }

    async deleteAssociation(id: number) {
        await this.prismaService.association.delete({
            where: {
                idAssociation: id
            }
        });

        return {data: "Association successfully deleted"};
    }
}
