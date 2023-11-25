import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateGameDto } from './dto/createGameDto';
import { GameModuleService } from './game-module.service';
import { create } from 'domain';

@Controller('game-module')
export class GameModuleController {

    constructor(private readonly gameModuleService: GameModuleService){}

    @Post()
    createGame(@Body() createGameDto: CreateGameDto) {        
        return this.gameModuleService.createGame(createGameDto);
    } 

    @Get()
    getGamesList() {
        return this.gameModuleService.getGamesList();
    }

    @Get('/:id')
    getGame(@Param('id') id: string) {
        return this.gameModuleService.getGame(id);
    }

    @Put('/:id')
    updateGame(@Param('id') id: string, @Body() createGameDto: CreateGameDto) {
        return this.gameModuleService.updateGame(id, createGameDto);
    }

    @Delete('/:id')
    deleteGame(@Param('id') id: string) {
        return this.gameModuleService.deleteGame(id);
    }

}
