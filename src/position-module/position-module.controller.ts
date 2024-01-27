import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePositionDto } from './dto/CreatePositionDto';
import { UpdatePositionDto } from './dto/UpdatePositionDto';
import { PositionModuleService } from './position-module.service';

@Controller('position-module')
export class PositionModuleController {

    constructor(private readonly positionService: PositionModuleService){}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async createPosition(@Req() request: Request, @Body() createPositionDto: CreatePositionDto){
        //Check if user is allowed to create a position (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to create a position`);
        }

        return this.positionService.createPosition(createPositionDto);
    }

    @Get()
    async getAllPosition(){
        return this.positionService.getAllPosition();
    }

    @Get('/:id')
    async getPositionById(@Param('id', ParseIntPipe) idPosition: number){
        return this.positionService.getPositionById(idPosition);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put('/:id')
    async updatePosition(@Req() request: Request, @Param('id', ParseIntPipe) idPosition: number, @Body() updatePositionDto: UpdatePositionDto){
        //Check if user is allowed to update a position (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to update a position`);
        }

        return this.positionService.updatePosition(idPosition, updatePositionDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete('/:id')
    async deletePosition(@Req() request: Request, @Param('id', ParseIntPipe) idPosition: number){
        //Check if user is allowed to delete a position (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to delete a position`);
        }

        return this.positionService.deletePosition(idPosition);
    }
}
