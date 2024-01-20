import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateNotifDto } from './dto/createNotifDto';
import { NotifModuleService } from './notif-module.service';

@Controller('notif-module')
export class NotifModuleController {

    constructor(private readonly notifModuleService: NotifModuleService){}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async createNotif(@Req() request: Request, @Body() createNotifDto: CreateNotifDto) {
        //Check if user is allowed to create a festival (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to send a notification`);
        }

        createNotifDto.DateEnvoi = new Date(Date.now());

        return this.notifModuleService.createNotif(CreateNotifDto);
    }

    @Get()
    async getAllNotifications() {
        return this.notifModuleService.getAllNotifications();
    }
    @Get()
    async getNotificationByType(@Param('type') Type: string) {
        return this.notifModuleService.getNotificationByType(Type);
    }
    
    @Delete(':id')
    async deleteNotification(@Req() request: Request, @Param('id', ParseIntPipe) idNotif: number) {
        //Check if user is allowed to delete a festival (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to delete a notification`);
        }

        return this.notifModuleService.deleteNotification(idNotif);
    }
}
