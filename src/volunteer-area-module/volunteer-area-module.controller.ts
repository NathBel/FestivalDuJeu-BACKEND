import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { VolunteerAreaModuleService } from './volunteer-area-module.service';
import { CreateAreaDto } from './dto/createAreaDto';
import { UpdateAreaDto } from './dto/updateAreaDto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

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
