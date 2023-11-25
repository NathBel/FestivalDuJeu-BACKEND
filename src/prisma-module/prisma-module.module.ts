import { Module, Global } from '@nestjs/common';
import { PrismaModuleService } from './prisma-module.service';

@Global()
@Module({
  providers: [PrismaModuleService],
  exports: [PrismaModuleService]
})
export class PrismaModuleModule {}
