import { Module } from '@nestjs/common';
import { VolunteerAreaModuleController } from './volunteer-area-module.controller';
import { VolunteerAreaModuleService } from './volunteer-area-module.service';

@Module({
  controllers: [VolunteerAreaModuleController],
  providers: [VolunteerAreaModuleService]
})
export class VolunteerAreaModuleModule {}
