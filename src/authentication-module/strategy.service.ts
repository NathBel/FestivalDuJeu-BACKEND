import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaModuleService } from "src/prisma-module/prisma-module.service";


type Payload = {
    sub: number;
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService, private readonly prismaService: PrismaModuleService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('SECRET_KEY'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload) {
        const user = await this.prismaService.benevole.findUnique({
            where: {
                Email: payload.email
            }
        });

        if (!user) {
            throw new UnauthorizedException("Utilisateur non trouvé");
        }

        Reflect.deleteProperty(user, 'Password');
        return user;
    }
}