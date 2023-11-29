import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateGameDto } from './dto/createGameDto';
import { UpdateGameDto } from './dto/updateGameDto';
import { GameModuleService } from './game-module.service';

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
    getGame(@Param('id', ParseIntPipe) idGame: number) {
        return this.gameModuleService.getGame(idGame);
    }

    @Put('/:id')
    updateGame(@Param('id', ParseIntPipe) idGame: number, @Body() updateGameDto: UpdateGameDto) {
        return this.gameModuleService.updateGame(idGame, updateGameDto);
    }

    @Delete('/:id')
    deleteGame(@Param('id', ParseIntPipe) idGame: number) {
        return this.gameModuleService.deleteGame(idGame);
    }

}
