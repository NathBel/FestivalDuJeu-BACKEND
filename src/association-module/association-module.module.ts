import { Module } from '@nestjs/common';
import { AssociationModuleController } from './association-module.controller';
import { AssociationModuleService } from './association-module.service';

@Module({
  controllers: [AssociationModuleController],
  providers: [AssociationModuleService]
})
export class AssociationModuleModule {}
