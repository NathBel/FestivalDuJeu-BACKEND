import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaModuleService extends PrismaClient{
    constructor( configService: ConfigService) {
        super( {
            datasources: {
                db: {
                    url: configService.get('DATABASE_URL'),
                }
            }
        });
    }
}
