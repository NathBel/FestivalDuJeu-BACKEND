import { Module } from '@nestjs/common';
import { GameModuleController } from './game-module.controller';
import { GameModuleService } from './game-module.service';

@Module({
  controllers: [GameModuleController],
  providers: [GameModuleService]
})
export class GameModuleModule {}
