import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { SigninDto } from './dto/signinDto';
import { AuthenticationModuleService } from './authentication-module.service';

@Controller('authentication-module')
export class AuthenticationModuleController {

    constructor(private readonly authService: AuthenticationModuleService) { }

    @Post("signup")
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post("signin")
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }
}
