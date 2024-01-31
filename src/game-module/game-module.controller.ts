import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { CreateGameDto } from './dto/createGameDto';
import { UpdateGameDto } from './dto/updateGameDto';
import { GameModuleService } from './game-module.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('game-module')
export class GameModuleController {

    constructor(private readonly gameModuleService: GameModuleService){}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createGame(@Req() request: Request, @Body() createGameDto: CreateGameDto) { 
        
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to create a game`);
        }
        
        return this.gameModuleService.createGame(createGameDto);
    } 

    @Get()
    getGamesList() {
        return this.gameModuleService.getGamesList();
    }

    @Get('/:id')
    getGame(@Param('id', ParseIntPipe) idGame: number) {        
        return this.gameModuleService.getGame(idGame);
    }

    @Get('/zoneBenevole/:idZone')
    getGameByZone(@Param('idZone', ParseIntPipe) idZone: number) {
        return this.gameModuleService.getGameByZone(idZone);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    updateGame(@Req() request: Request, @Param('id', ParseIntPipe) idGame: number, @Body() updateGameDto: UpdateGameDto) {

        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to update a game`);
        }

        return this.gameModuleService.updateGame(idGame, updateGameDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deleteGame(@Req() request: Request, @Param('id', ParseIntPipe) idGame: number) {

        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to delete a game`);
        }
        
        return this.gameModuleService.deleteGame(idGame);
    }

}
