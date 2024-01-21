import { Module } from '@nestjs/common';
import { NotifModuleController } from './notif-module.controller';
import { NotifModuleService } from './notif-module.service';

@Module({
  controllers: [NotifModuleController],
  providers: [NotifModuleService]
})
export class NotificationModuleModule {}
