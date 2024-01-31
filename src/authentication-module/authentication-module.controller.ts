import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthenticationModuleService } from './authentication-module.service';
import { DeleteAccountDto } from './dto/deleteAccountDto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDto';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signupDto';
import { UpdateRoleDto } from './dto/updateRoleDto';

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
    updateRole(@Req() request: Request, @Body() updateRole: UpdateRoleDto,@Body('idBenevole', ParseIntPipe) idBenevole: number){
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to update a role`);
        }

        return this.authService.updateRole(idBenevole, updateRole);
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

    @Get('/:idBenevole')
getUserById(@Param('idBenevole', ParseIntPipe) idBenevole: number){
    return this.authService.getUserById(idBenevole);
}

}
