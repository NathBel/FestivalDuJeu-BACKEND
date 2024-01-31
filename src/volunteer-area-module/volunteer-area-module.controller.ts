import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateAreaDto } from './dto/createAreaDto';
import { UpdateAreaDto } from './dto/updateAreaDto';
import { VolunteerAreaModuleService } from './volunteer-area-module.service';

@Controller('volunteer-area-module')
export class VolunteerAreaModuleController {

    constructor(private readonly volunteerAreaService: VolunteerAreaModuleService){}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async createArea(@Req() request: Request, @Body() createAreaDto: CreateAreaDto){
        //Check if user is allowed to create an area (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to create an area`);
        }

        return this.volunteerAreaService.createArea(createAreaDto);
    }

    @Get()
    async getAllArea(){
        return this.volunteerAreaService.getAllArea();
    }

    @Get('/:id')
    async getAreaById(@Param('id', ParseIntPipe) idArea: number){
        return this.volunteerAreaService.getAreaById(idArea);
    }

    @Get('/:idFestival/:idPoste')
    async getAreaByIdFestivalAndIdPoste(@Param('idFestival', ParseIntPipe) idFestival: number, @Param('idPoste', ParseIntPipe) idPoste: number){
        return this.volunteerAreaService.getAreaByIdFestivalAndIdPoste(idFestival, idPoste);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put('/:id')
    async updateArea(@Req() request: Request, @Param('id', ParseIntPipe) idArea: number, @Body() updateAreaDto: UpdateAreaDto){
        //Check if user is allowed to update an area (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to update an area`);
        }

        return this.volunteerAreaService.updateArea(idArea, updateAreaDto);
    }

    @Delete('/:id')
    async deleteArea(@Req() request: Request, @Param('id', ParseIntPipe) idArea: number){
        //Check if user is allowed to delete an area (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to delete an area`);
        }

        return this.volunteerAreaService.deleteArea(idArea);
    }
}
