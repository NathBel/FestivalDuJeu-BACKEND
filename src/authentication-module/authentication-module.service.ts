import { Injectable, ConflictException, Post, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';
import { SignupDto } from './dto/signupDto';
import { SigninDto } from './dto/signinDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationModuleService {

    constructor(private readonly prismaService: PrismaModuleService,
                private readonly JwtService: JwtService,
                private readonly configService: ConfigService) { }

    async signup(signupDto: SignupDto) {

        const { Nom, Prenom, Email, Password, Role, TailletTShirt, Regime, StatutHebergement, NombreEditionPrecedente, Adresse, Ville, CodePostal, Telephone, JeuPrefere} = signupDto;

        //Vérifier si l'email existe déjà
        const user = await this.prismaService.benevole.findUnique({
            where: {
                Email: Email
            }
        });

        if (user) {
            throw new ConflictException("Email existe déjà");
        }

        //Hasher le mot de passe
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(Password, salt);

        //Créer un nouvel utilisateur
        await this.prismaService.benevole.create({
            data: {
                Nom: Nom,
                Prenom: Prenom,
                Email: Email,
                Password: hashedPassword,
                Role: Role,
                TailletTShirt: TailletTShirt,
                Regime: Regime,
                StatutHebergement: StatutHebergement,
                NombreEditionPrecedente: NombreEditionPrecedente,
                Adresse: Adresse,
                Ville: Ville,
                CodePostal: CodePostal,
                Telephone: Telephone,
                JeuPrefere: JeuPrefere,
            }
        });

        //Envoi d'un email de confirmation
        
        //Retourner un message de succès
        return {
            data: "Inscription réussie"
        }
        
    }

    @Post("signin")
    async signin(signinDto: SigninDto) {
        //Vérifier si l'utilisateur existe
        const user = await this.prismaService.benevole.findUnique({
            where: {
                Email: signinDto.Email
            }
        });

        if (!user) {
            throw new NotFoundException("Utilisateur non trouvé");
        }

        //Comparer le mot de passe
        const isMatch = await bcrypt.compare(signinDto.Password, user.Password);
        if (!isMatch) {
            throw new UnauthorizedException("Mot de passe incorrect");
        }
        //Générer un token
        const payload = { id: user.idBenevole, email: user.Email, role: user.Role };
        const token = this.JwtService.sign(payload, { expiresIn: '24h', secret: this.configService.get('SECRET_KEY') });

        //Retourner le token
        return {
            token: token
        }
    }
}
