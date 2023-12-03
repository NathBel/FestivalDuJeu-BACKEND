import { Body, Controller, Delete, Get, Post, Put, UseGuards, Req, Param, ParseIntPipe, ForbiddenException } from '@nestjs/common';
import { FestivalModuleService } from './festival-module.service';
import { CreateFestivalDto } from './dto/createFestivalDto';
import { UpdateFestivalDto } from './dto/updateFestivalDto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('festival-module')
export class FestivalModuleController {

    constructor(private readonly festivalModuleService: FestivalModuleService){}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async createFestival(@Req() request: Request, @Body() createFestivalDto: CreateFestivalDto) {
        //Check if user is allowed to create a festival (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to create a festival`);
        }

        return this.festivalModuleService.createFestival(createFestivalDto);
    }

    @Get()
    async getAllFestivals() {
        return this.festivalModuleService.getAllFestivals();
    }

    @Get(':id')
    async getFestival(@Param('id', ParseIntPipe) idFestival: number) {
        return this.festivalModuleService.getFestival(idFestival);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put(':id')
    async updateFestival(@Req() request: Request, @Param('id', ParseIntPipe) idFestival: number, @Body() updateFestivalDto: UpdateFestivalDto) {
        //Check if user is allowed to delete a festival (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to delete a festival`);
        }

        return this.festivalModuleService.updateFestival(idFestival, updateFestivalDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(':id')
    async deleteFestival(@Req() request: Request, @Param('id', ParseIntPipe) idFestival: number) {
        //Check if user is allowed to delete a festival (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to delete a festival`);
        }

        return this.festivalModuleService.deleteFestival(idFestival);
    }
}
