import { Injectable } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';

@Injectable()
export class NotifModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createNotif(createNotifDto) {
        const {idFestival, TexteNotification, Type, DateEnvoi} = createNotifDto;

        //Check if festival exists
        const festival = await this.prismaService.festival.findUnique({
            where: {
                idFestival: idFestival
            }
        });

        if(!festival) {
            return {data: "Festival not found"};
        }

        return this.prismaService.notification.create({
            data: {
                idFestival,
                TexteNotification,
                DateEnvoi: new Date(DateEnvoi),
                Type,
            }
        });
    }

    async getAllNotifications() {
        return await this.prismaService.notification.findMany();
    }

    async getNotificationByType(Type: string) {

        const notification = await this.prismaService.notification.findMany({
            where: {
                Type: Type
            }
        });

        if(!notification) {
            return {data: "Notification not found"};
        }

        return notification;
    }

    
    async deleteNotification(idNotif: number, idFestival: number) {
        return this.prismaService.notification.delete({
            where: {
                idFestival_idNotif: {
                    idNotif: idNotif,
                    idFestival: idFestival
                }
            }
        });
    }
}
