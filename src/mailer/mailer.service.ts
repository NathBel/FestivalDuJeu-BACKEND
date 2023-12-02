import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {

    private async transporter() {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            ignoreTLS: true,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        return transporter;
    }

    async sendSignupConfirmation(userEmail: string) {
        (await this.transporter()).sendMail({
            from: "app@localhost.com",
            to : userEmail,
            subject: "Inscription réussie",
            text: "<h3>Confirmation d'inscription à l'application du Festival Du Jeux ! </h3>"
        });
    }

    async sendResetPassword(userEmail: string, url: string, code: string) {
        (await this.transporter()).sendMail({
            from: "app@localhost.com",
            to : userEmail,
            subject: "Reset password",
            html:'<a href="${url}">Changer votre mot de passe</a> <br> <p>Code de vérification : <strong>${code}</strong></p>  <br> <p>Ce code expire dans 15 minutes</p>',

        });
    }
}
