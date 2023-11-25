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
}
