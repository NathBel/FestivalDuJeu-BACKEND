import { UseGuards, Req, Controller, Post, Body, Put, Delete, Get, ForbiddenException } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { SigninDto } from './dto/signinDto';
import { UpdateRoleDto } from './dto/updateRoleDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
import { AuthenticationModuleService } from './authentication-module.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DeleteAccountDto } from './dto/deleteAccountDto';

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

    @Post("reset-password")
    resetPasswordDemand(@Body() resetPasswordDemandDto : ResetPasswordDemandDto) {
        return this.authService.resetPasswordDemand(resetPasswordDemandDto);
    }

    @Post("reset-password-confirmation")
    resetPasswordConfirmation(@Body() resetPasswordConfirmationDto : ResetPasswordConfirmationDto) {
        return this.authService.resetPasswordConfirmation(resetPasswordConfirmationDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put("update-account")
    updateAccount(@Req() request: Request, @Body() signupDto: SignupDto) {
        const userId = request.user["idBenevole"];
        return this.authService.updateAccount(userId, signupDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put("update-role")
    updateRole(@Req() request: Request, @Body() updateRole: UpdateRoleDto) {
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to update a role`);
        }

        return this.authService.updateRole(user["idBenevole"], updateRole);
    }


    @UseGuards(AuthGuard("jwt"))
    @Delete("delete-account")
    deleteAccount(@Req() request: Request, @Body() deleteAccountDto: DeleteAccountDto) {
        const userId = request.user["idBenevole"];
        return this.authService.deleteAccount(userId, deleteAccountDto);
    }

    @Get()
    getAllUser() {
        return this.authService.getAllUsers();
    }

}
