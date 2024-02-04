import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';

@Injectable()
export class InscriptionModuleService {

    constructor(private readonly prismaService: PrismaModuleService){}

    async createInscription(createInscriptionDto: any){

        const {idBenevole, idPoste, idZoneBenevole, Jour, Creneau, isPresent} = createInscriptionDto;

        if(!isPresent){
            createInscriptionDto.isPresent = false;
        }

        createInscriptionDto.Jour = new Date(Jour);

        //Check if foreign key idVolunteer exists
        const volunteer = await this.prismaService.benevole.findUnique({
            where: {
                idBenevole: createInscriptionDto.idBenevole
            }
        });

        //Check if foreign key idPosition exists
        const position = await this.prismaService.poste.findUnique({
            where: {
                idPoste: createInscriptionDto.idPoste
            }
        });
 
        //Check if inscription already exists
        const inscription = await this.prismaService.inscription.findFirst({
            where: {
                idBenevole: createInscriptionDto.idBenevole,
                idPoste: createInscriptionDto.idPoste,
                idZoneBenevole: createInscriptionDto.idZoneBenevole,
                Creneau: createInscriptionDto.Creneau,
                Jour: createInscriptionDto.Jour
            }
        });

        if(inscription){
            throw new Error(`Inscription already exists`);
        }

        if(!volunteer){
            throw new NotFoundException(`Volunteer with id ${createInscriptionDto.idBenevole} not found`);
        }

        if(!position){
            throw new NotFoundException(`Position with id ${createInscriptionDto.idPoste} not found`);
        }

        return this.prismaService.inscription.create({
            data: createInscriptionDto
        });
    }

    async getAllInscription(){
        return this.prismaService.inscription.findMany();
    }

    async getAllInscriptionUniqueIDbenevole(){
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Définir l'heure sur 00:00:00.000

        return this.prismaService.inscription.findMany({
            select: {
                idBenevole: true,
                idPoste: true,
                idZoneBenevole: true,
                Creneau: true,
                Jour: true,
                isPresent: true
            },
            where: {
                Jour: {
                gte: todayStart,
                lte: new Date() // Utilisez la date actuelle pour inclure jusqu'à maintenant
                }
            },
            distinct: ['idBenevole'] 
            
        });
    }

    async getInscriptionByVolunteerId(idVolunteer: number){
        return this.prismaService.inscription.findMany({
            where: {
                idBenevole: idVolunteer
            }
        });
    }

    async getInscriptionByPositionId(idPosition: number){
        return this.prismaService.inscription.findMany({
            where: {
                idPoste: idPosition
            }
        });
    }

    async getInscriptionByPositionAndVolunteerId(idPosition: number, idVolunteer: number){
        return this.prismaService.inscription.findMany({
            where: {
                idPoste: idPosition,
                idBenevole: idVolunteer
            }
        });
    }

    async getInscriptionByZoneId(idZone: number){
        return this.prismaService.inscription.findMany({
            where: {
                idZoneBenevole: idZone
            }
        });
    }
    
    async getInscriptionByDayAndTime(Jour: string, Creneau: string) {
        try {
          const date = new Date(Jour);
        console.log(date);
        console.log(Jour);
        console.log(new Date(Jour));
          if (isNaN(date.getTime())) {
            throw new Error('Date invalide');
          }
      
          return this.prismaService.inscription.findMany({
            where: {
              Jour: date,
              Creneau: Creneau,
            },
          });
        } catch (error) {
          console.error('Erreur lors de la conversion de la date :', error);
          throw new Error('Date invalide');
        }
      }

    async updateInscription(idVolunteer: number, idPosition: number, idZone: number, Jour:string, Creneau:string, updateInscriptionDto: any){
            
            //Check if foreign key idVolunteer exists
            const volunteer = await this.prismaService.benevole.findUnique({
                where: {
                    idBenevole: idVolunteer
                }
            });
    
            //Check if foreign key idPosition exists
            const position = await this.prismaService.poste.findUnique({
                where: {
                    idPoste: idPosition
                }
            });

            //Check if foreign key idZone exists
            const zone = await this.prismaService.zoneBenevole.findUnique({
                where: {
                    idZoneBenevole: idZone
                }
            });
    
            if(!volunteer){
                throw new NotFoundException(`Volunteer with id ${idVolunteer} not found`);
            }
    
            if(!position){
                throw new NotFoundException(`Position with id ${idPosition} not found`);
            }
    
            if (!zone) {
                throw new NotFoundException(`Zone with id ${idZone} not found`);
            }

            return this.prismaService.inscription.update({
                where: {
                    idBenevole_idPoste_idZoneBenevole_Creneau_Jour: {
                        idBenevole: idVolunteer,
                        idPoste: idPosition,
                        idZoneBenevole: idZone,
                        Creneau: Creneau,
                        Jour: Jour
                    }
                },
                data: updateInscriptionDto
            });
        }

    async deleteInscription(idVolunteer: number, idPosition: number, idZone: number, Jour:string, Creneau:string){
        return this.prismaService.inscription.delete({
            where: {
                idBenevole_idPoste_idZoneBenevole_Creneau_Jour: {
                    idBenevole: idVolunteer,
                    idPoste: idPosition,
                    idZoneBenevole: idZone,
                    Creneau: Creneau,
                    Jour: Jour
                }
            }
        });

    }

    async deleteInscriptionByidBenevole(idVolunteer: number){
        return this.prismaService.inscription.deleteMany({
            where: {
                idBenevole: idVolunteer
            }
        });
    }

    async getTodayInscriptionById (idVolunteer: number){
        //get all occurenced of volunteer
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Définir l'heure sur 00:00:00.000

        const volunteer = await this.prismaService.inscription.findMany({
            where: {
                idBenevole: idVolunteer,
                Jour: {
                gte: todayStart,
                lte: new Date() // Utilisez la date actuelle pour inclure jusqu'à maintenant
                }
            }
            });

        return volunteer;
    }

    async updateInscriptionById(idInscription: number,presence: boolean){
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Définir l'heure sur 00:00:00.000

        return this.prismaService.inscription.updateMany({
            where: {
                idBenevole: idInscription,
                Jour: {
                gte: todayStart,
                lte: new Date() // Utilisez la date actuelle pour inclure jusqu'à maintenant
                }
            },
            data: {
                isPresent: presence
            }

        });
    }

}
