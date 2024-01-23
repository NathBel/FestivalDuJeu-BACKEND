import { Injectable } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';
import { CreateNotifDto } from './dto/createNotifDto';
@Injectable()
export class NotifModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createNotification(createNotifDto: CreateNotifDto) {
        const { idFestival, TexteNotification, Type } = createNotifDto;
    
        // Obtenez la date actuelle
        const currentDate = new Date();
    
        const createdNotification = await this.prismaService.notification.create({
          data: {
            idFestival,
            TexteNotification,
            Type,
            DateEnvoi: currentDate,
          },
        });
    
        return createdNotification;
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
