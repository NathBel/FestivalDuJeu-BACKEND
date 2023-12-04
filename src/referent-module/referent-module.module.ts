import { Module } from '@nestjs/common';
import { ReferentModuleController } from './referent-module.controller';
import { ReferentModuleService } from './referent-module.service';

@Module({
  controllers: [ReferentModuleController],
  providers: [ReferentModuleService]
})
export class ReferentModuleModule {}
