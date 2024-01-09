import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaModuleService } from 'src/prisma-module/prisma-module.service';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDto';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signupDto';
import { UpdateDto } from './dto/updateDto';

@Injectable()
export class AuthenticationModuleService {

    constructor(private readonly prismaService: PrismaModuleService,
                private readonly MailerService: MailerService,
                private readonly JwtService: JwtService,
                private readonly configService: ConfigService) { }

    async signup(signupDto: SignupDto) {

        const { Pseudo, Nom, Prenom, Email, Password, Role, TailletTShirt, Regime, StatutHebergement, NombreEditionPrecedente, Adresse, Ville, CodePostal, Telephone, JeuPrefere} = signupDto;

        //Vérifier si l'email existe déjà
        const user = await this.prismaService.benevole.findUnique({
            where: {
                Email: Email,
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
                Pseudo: Pseudo,
                Nom: Nom,
                Prenom: Prenom,
                Email: Email,
                Password: hashedPassword,
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
        //await this.MailerService.sendSignupConfirmation(Email);

        //Retourner un message de succès
        return {
            data: "Inscription réussie"
        }
        
    }

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

    async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {

        const { Email } = resetPasswordDemandDto;

        //Vérifier si l'utilisateur existe
        const user = await this.prismaService.benevole.findUnique({
            where: {
                Email: Email
            }
        });

        if (!user) {
            throw new NotFoundException("Utilisateur non trouvé");
        }

        //Generer un code de réinitialisation
        const secretCode = speakeasy.totp({
            secret: this.configService.get('OTP_CODE'),
            digits: 6,
            step: 15 * 60,
            encoding: 'base32'
        });

        //Envoi d'un email de réinitialisation
         const url = "http://localhost:3000/authentication-module/reset-password";


        //Retourner un message de succès
        return {
            data: "Email de réinitialisation de mot de passe envoyé"
        }
    }

    async resetPasswordConfirmation(resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        const { Email, Password, code } = resetPasswordConfirmationDto;

        const user = await this.prismaService.benevole.findUnique({
            where: {
                Email: Email
            }
        });

        if (!user) {
            throw new NotFoundException("Utilisateur non trouvé");
        }

        const match = speakeasy.totp.verify({
            secret: this.configService.get('OTP_CODE'),
            token: code,
            digits: 6,
            step: 15 * 60,
            encoding: 'base32'
        });

        if (!match) {
            throw new UnauthorizedException("Code incorrect");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(Password, salt);

        await this.prismaService.benevole.update({
            where: {
                Email: Email
            },
            data: {
                Password: hashedPassword
            }
        });

        return {
            data: "Mot de passe réinitialisé avec succès"
        }
    }

    async updateAccount(userId: number, updateDto: UpdateDto) {
        const { Pseudo, Nom, Prenom, Email, TailletTShirt, Regime, StatutHebergement, NombreEditionPrecedente, Adresse, Ville, CodePostal, Telephone, JeuPrefere} = updateDto;

        //Vérifier si l'utilisateur existe
        const user = await this.prismaService.benevole.findUnique({
            where: {
                idBenevole: userId
            }
        });

        if (!user) {
            throw new NotFoundException("Utilisateur non trouvé");
        }

        //Mettre à jour l'utilisateur
        await this.prismaService.benevole.update({
            where: {
                idBenevole: userId
            },
            data: {
                Pseudo: Pseudo,
                Nom: Nom,
                Prenom: Prenom,
                Email: Email,
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

        //Retourner un message de succès
        return {
            data: "Compte mis à jour avec succès"
        }
    }

    async updateRole(userId: number, updateRoleDto: any) {

        const { Role } = updateRoleDto;

        //Vérifier si l'utilisateur existe
        const user = await this.prismaService.benevole.findUnique({
            where: {
                idBenevole: userId
            }
        });

        if (!user) {
            throw new NotFoundException("Utilisateur non trouvé");
        }

        //Mettre à jour l'utilisateur
        await this.prismaService.benevole.update({
            where: {
                idBenevole: userId
            },
            data: {
                Role: Role
            }
        });
    }


    async deleteAccount(userId: number, deleteAccountDto: any) {
        const { Password } = deleteAccountDto;

        //Vérifier si l'utilisateur existe
        const user = await this.prismaService.benevole.findUnique({
            where: {
                idBenevole: userId
            }
        });

        if (!user) {
            throw new NotFoundException("Utilisateur non trouvé");
        }

        //Comparer le mot de passe
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            throw new UnauthorizedException("Mot de passe incorrect");
        }

        //Supprimer l'utilisateur
        await this.prismaService.benevole.delete({
            where: {
                idBenevole: userId
            }
        });

        //Retourner un message de succès
        return {
            data: "Compte supprimé avec succès"
        }
    }

    async getAllUsers() {
        return this.prismaService.benevole.findMany();
    }
}
