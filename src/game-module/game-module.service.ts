import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateGameDto } from './dto/createGameDto';
import { PrismaModuleService } from '../prisma-module/prisma-module.service';
import { UpdateGameDto } from './dto/updateGameDto';

@Injectable()
export class GameModuleService {

    constructor(private readonly PrismaModuleService: PrismaModuleService){}
    async createGame(createGameDto: CreateGameDto) {

        // TODO : Check if user is allowed to create a game (=user is admin)
        if(false) { 
            throw new ForbiddenException(`You are not allowed to create a game`);
        }

        //Recuperation des données du jeu à créer
        const {idJeux, NomJeu, Editeur, TypePublic, Animation, Recu, LienNotice, LienVideoExplicative} = createGameDto;

                //Creation du jeu
        await this.PrismaModuleService.jeux.create({
            data: {
                idJeux,
                NomJeu,
                Editeur,
                TypePublic,
                Animation,
                Recu,
                LienNotice,
                LienVideoExplicative,
            }
        });

        //Reponse client
        return {data : "Game successfully created"}
    }

    async getGamesList() {
        return await this.PrismaModuleService.jeux.findMany();
    }

    async getGame(id: number) {

        const game = await this.PrismaModuleService.jeux.findUnique({
            where: {
                idJeux: id
            }
        });

        if(!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }

        
        return await this.PrismaModuleService.jeux.findUnique({
            where: {
                idJeux: id
            }
        });
    }

    async updateGame(id: number, updateGameDto: UpdateGameDto) {

        const game = await this.PrismaModuleService.jeux.findUnique({
            where: {
                idJeux: id
            }
        });

        if(!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }

        // TODO : Check if user is allowed to update this game (=user is admin)
        if(false) { 
            throw new ForbiddenException(`You are not allowed to update this game`);
        }

        //Modification du jeu
        await this.PrismaModuleService.jeux.update({
            where: {
                idJeux: id
            },
            data: {
                ...updateGameDto
            }
        });

        return {data : "Game successfully updated"};
    }

    async deleteGame(id: number) {

        const game = await this.PrismaModuleService.jeux.findUnique({
            where: {
                idJeux: id
            }
        });

        if(!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }

        // TODO : Check if user is allowed to update this game (=user is admin)
        if(false) { 
            throw new ForbiddenException(`You are not allowed to update this game`);
        }
        
        await this.PrismaModuleService.jeux.delete({
            where: {
                idJeux: id
            }
        });
        return {data : "Game successfully deleted"};
    }
}
