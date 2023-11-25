import { Module } from '@nestjs/common';
import { GameModuleModule } from './game-module/game-module.module';
import { PrismaModuleModule } from './prisma-module/prisma-module.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [ConfigModule.forRoot({isGlobal : true}) ,GameModuleModule, PrismaModuleModule],
})
export class AppModule {}
