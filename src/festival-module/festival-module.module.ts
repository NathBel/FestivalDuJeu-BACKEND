import { Module } from '@nestjs/common';
import { FestivalModuleController } from './festival-module.controller';
import { FestivalModuleService } from './festival-module.service';

@Module({
  controllers: [FestivalModuleController],
  providers: [FestivalModuleService]
})
export class FestivalModuleModule {}
