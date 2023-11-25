import { Controller, Post, Get, Put, Delete, Body } from '@nestjs/common';
import { CreateGameDto } from './dto/createGameDto';
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
        return 'games list';
    }

    @Get('/game/:id')
    getGame() {
        return 'game';
    }

    @Put('/game/:id')
    updateGame() {
        return 'update game';
    }

    @Delete('/game/:id')
    deleteGame() {
        return 'delete game';
    }

}
