import { Module } from '@nestjs/common';
import { EmployerModuleController } from './employer-module.controller';
import { EmployerModuleService } from './employer-module.service';

@Module({
  controllers: [EmployerModuleController],
  providers: [EmployerModuleService]
})
export class EmployerModuleModule {}
