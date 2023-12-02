import { Module } from '@nestjs/common';
import { AuthenticationModuleController } from './authentication-module.controller';
import { AuthenticationModuleService } from './authentication-module.service';
import { JwtStrategy } from './strategy.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthenticationModuleController],
  providers: [AuthenticationModuleService, JwtStrategy]
})
export class AuthenticationModuleModule {}
