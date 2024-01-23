import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateNotifDto } from './dto/createNotifDto';
import { NotifModuleService } from './notif-module.service';

@Controller('notif-module')
export class NotifModuleController {

    constructor(private readonly notifModuleService: NotifModuleService){}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async createNotification(@Body() createNotifDto: CreateNotifDto) {
      return this.notifModuleService.createNotification(createNotifDto);
    }
  
    @Get()
    async getAllNotifications() {
        return this.notifModuleService.getAllNotifications();
    }
    @Get()
    async getNotificationByType(@Param('type') Type: string) {
        return this.notifModuleService.getNotificationByType(Type);
    }

    
    @Delete('/delete/:idNotif/:idFestival')
    async deleteNotification(@Param('idNotif', ParseIntPipe) idNotif: number, @Param('idFestival', ParseIntPipe) idFestival: number) {
        return this.notifModuleService.deleteNotification(idNotif, idFestival);
    }
}
