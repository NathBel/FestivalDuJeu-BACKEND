import { Module } from '@nestjs/common';
import { InscriptionModuleController } from './inscription-module.controller';
import { InscriptionModuleService } from './inscription-module.service';

@Module({
  controllers: [InscriptionModuleController],
  providers: [InscriptionModuleService]
})
export class InscriptionModuleModule {}
