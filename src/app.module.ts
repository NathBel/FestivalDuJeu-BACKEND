import { Module } from '@nestjs/common';
import { GameModuleModule } from './game-module/game-module.module';
import { PrismaModuleModule } from './prisma-module/prisma-module.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModuleModule } from './authentication-module/authentication-module.module';
import { MailerModule } from './mailer/mailer.module';
import { AssociationModuleModule } from './association-module/association-module.module';
import { FestivalModuleModule } from './festival-module/festival-module.module';
import { VolunteerAreaModuleModule } from './volunteer-area-module/volunteer-area-module.module';



@Module({
  imports: [ConfigModule.forRoot({isGlobal : true}) ,GameModuleModule, PrismaModuleModule, AuthenticationModuleModule, MailerModule, AssociationModuleModule, FestivalModuleModule, VolunteerAreaModuleModule],
})
export class AppModule {}
