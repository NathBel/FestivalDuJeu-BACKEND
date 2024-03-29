import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateInscriptionDto } from 'src/inscription-module/dto/createInscriptionDto';
import { UpdateInscriptionDto } from 'src/inscription-module/dto/updateInscriptionDto';
import { InscriptionModuleService } from './inscription-module.service';

@Controller('inscription-module')
export class InscriptionModuleController {

    constructor(private readonly inscriptionService: InscriptionModuleService){}

    @Post()
    async createInscription(@Body() createInscriptionDto: CreateInscriptionDto){
        return this.inscriptionService.createInscription(createInscriptionDto);
    }

    @Get()
    async getAllInscription(){
        return this.inscriptionService.getAllInscription();
    }

    @Get('volunteer/:id')
    async getInscriptionByVolunteerId(@Param('id', ParseIntPipe) idVolunteer: number){
        return this.inscriptionService.getInscriptionByVolunteerId(idVolunteer);
    }

    @Get('position/:id')
    async getInscriptionByPositionId(@Param('id', ParseIntPipe) idPosition: number){
        return this.inscriptionService.getInscriptionByPositionId(idPosition);
    }

    @Get('position/:idPostion/volunteer/:idVolunteer')
    async getInscriptionByPositionAndVolunteerId(@Param('idPostion', ParseIntPipe) idPosition: number, @Param('idVolunteer', ParseIntPipe) idVolunteer: number){
        return this.inscriptionService.getInscriptionByPositionAndVolunteerId(idPosition, idVolunteer);
    }

    @Get('zone/:id')
    async getInscriptionByZoneId(@Param('id', ParseIntPipe) idZone: number){
        return this.inscriptionService.getInscriptionByZoneId(idZone);
    }

    @Get('/:jour/:creneau')
    async getInscriptionByDayAndTime(@Param('Jour') Jour: string, @Param('Creneau') Creneau: string){
        return this.inscriptionService.getInscriptionByDayAndTime(Jour, Creneau);
    }

    @Get('volunteer/:id/jour/:jour/creneau/:creneau')
    async getInscriptionByDayAndTimeAndVolunteer(@Param('id', ParseIntPipe) idVolunteer: number, 
    @Param('jour') Jour: string, @Param('creneau') Creneau: string){
        return this.inscriptionService.getInscriptionByDayAndTimeAndVolunteer(idVolunteer, Jour, Creneau);
    }

    @Put('/update')
    async updateInscription(
    @Body('idBenevole', ParseIntPipe) idVolunteer: number,
    @Body('idPoste', ParseIntPipe) idPosition: number,
    @Body('Jour') Jour: string,
    @Body('Creneau') Creneau: string,
    @Body('updateInscriptionDto') updateInscriptionDto: UpdateInscriptionDto){
        return this.inscriptionService.updateInscription(idVolunteer, idPosition, Jour, Creneau, updateInscriptionDto);
    }

    @Delete('/delete')
    async deleteInscription(
    @Body('idBenevole', ParseIntPipe) idVolunteer: number,
    @Body('idPoste', ParseIntPipe) idPosition: number,
    @Body('Jour') Jour: string,
    @Body('Creneau') Creneau: string){
        return this.inscriptionService.deleteInscription(idVolunteer, idPosition, Jour, Creneau);
    }

    @Delete('/delete/:id')
    async deleteInscriptionById(@Param('id', ParseIntPipe) idVolunteer: number){
        return this.inscriptionService.deleteInscriptionByidBenevole(idVolunteer);
    }

    @Get ('inscription/:id')
    async getInscriptionById(@Param('id', ParseIntPipe) idInscription: number){
        return this.inscriptionService.getTodayInscriptionById(idInscription);
    }

    @Put ('inscriptionPresent/:id')
    async updateInscriptionById(@Param('id', ParseIntPipe) idInscription: number,
    @Body('Presence') presence: boolean){
        return this.inscriptionService.updateInscriptionById(idInscription, presence);
    }

    @Get('getAllbenevoleInscritToday')
    async getAllInscriptionUniqueIDbenevole(){
        return this.inscriptionService.getAllInscriptionUniqueIDbenevole();
    }
 }
