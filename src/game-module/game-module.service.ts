import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/createGameDto';
import { PrismaModuleService } from '../prisma-module/prisma-module.service';

@Injectable()
export class GameModuleService {

    constructor(private readonly PrismaModuleService: PrismaModuleService){}
    async createGame(createGameDto: CreateGameDto) {

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

    async getGame(id: string) {
        return await this.PrismaModuleService.jeux.findUnique({
            where: {
                idJeux: Number(id)
            }
        });
    }

    async updateGame(id: string, createGameDto: CreateGameDto) {

        //Recuperation des données du jeu à modifier
        const {idJeux, NomJeu, Editeur, TypePublic, Animation, Recu, LienNotice, LienVideoExplicative} = createGameDto;

        //Modification du jeu
        await this.PrismaModuleService.jeux.update({
            where: {
                idJeux: Number(id)
            },
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

        return {data : "Game successfully updated"};
    }

    async deleteGame(id: string) {
        await this.PrismaModuleService.jeux.delete({
            where: {
                idJeux: Number(id)
            }
        });
        return {data : "Game successfully deleted"};
    }
}
