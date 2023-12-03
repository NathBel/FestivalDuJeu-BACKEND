import { Module } from '@nestjs/common';
import { PositionModuleController } from './position-module.controller';
import { PositionModuleService } from './position-module.service';

@Module({
  controllers: [PositionModuleController],
  providers: [PositionModuleService]
})
export class PositionModuleModule {}
