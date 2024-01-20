import { Injectable } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';

@Injectable()
export class NotifModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createNotif(createNotifDto) {
        const {NomNotification, DateEnvoi,Type} = createNotifDto;


        return this.prismaService.notification.create({
            data: {
                NomNotification,
                DateEnvoi: new Date(DateEnvoi),
                Type
            }
        });

        
    }

    async getAllNotifications() {
        return await this.prismaService.notification.findMany();
    }

    async getNotificationByType(Type: string) {

        //Check if festival exists
        const notification = await this.prismaService.notification.findUnique({
            where: {
                Type: Type
            }
        });

        if(!notification) {
            return {data: "Notification not found"};
        }

        return await this.prismaService.notification.findUnique({
            where: {
                Type: Type
            }
        });
    }

    
    async deleteNotification(idNotif: number) {

        //Check if festival exists
        const notification = await this.prismaService.notification.findUnique({
            where: {
                idNotif: idNotif
            }
        });

        if(!notification) {
            return {data: "Notif not found"};
        }
        
        await this.prismaService.notification.delete({
            where: {
                idNotif: idNotif
            }
        });

        return {data: "Notification successfully deleted"};
    }
}
