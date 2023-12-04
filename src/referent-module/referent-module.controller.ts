import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { ReferentModuleService } from './referent-module.service';
import { CreateReferentDto } from './dto/CreateReferentDto';
import { UpdateReferentDto } from './dto/UpdateReferentDto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('referent-module')
export class ReferentModuleController {

    constructor(private readonly referentService: ReferentModuleService){}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async createInscription(@Body() createReferentDto: CreateReferentDto){
        return this.referentService.createReferent(createReferentDto);
    }

    @Get()
    async getAllReferents(){
        return this.referentService.getAllReferents();
    }

    @Get('volunteer/:idBenevole')
    async getAllReferentsByIdBenevole(@Param('idBenevole', ParseIntPipe) idBenevole: number){
        return this.referentService.getAllReferentsByIdBenevole(idBenevole);
    }

    @Get('position/:idPoste')
    async getAllReferentsByIdPoste(@Param('idPoste', ParseIntPipe) idPoste: number){
        return this.referentService.getAllReferentsByIdPoste(idPoste);
    }

    @Get(':idBenevole/:idReferent')
    async getReferentById(@Param('idBenevole', ParseIntPipe) idBenevole: number, @Param('idReferent', ParseIntPipe) idReferent: number){
        return this.referentService.getReferentByIdBenevoleIdReferent(idBenevole, idReferent);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put(':idBenevole/:idReferent')
    async updateReferent(@Param('idBenevole', ParseIntPipe) idBenevole: number, @Param('idReferent', ParseIntPipe) idReferent: number, @Body() updateReferentDto: UpdateReferentDto){
        return this.referentService.updateReferent(idBenevole, idReferent, updateReferentDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(':idBenevole/:idReferent')
    async deleteReferent(@Param('idBenevole', ParseIntPipe) idBenevole: number, @Param('idReferent', ParseIntPipe) idReferent: number){
        return this.referentService.deleteReferent(idBenevole, idReferent);
    }

}
