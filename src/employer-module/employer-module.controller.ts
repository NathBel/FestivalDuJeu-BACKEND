import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateEmployerDto } from 'src/employer-module/dto/createEmployerDto';
import { UpdateEmployerDto } from 'src/employer-module/dto/updateEmployerDto';
import { EmployerModuleService } from './employer-module.service';

@Controller('employer-module')
export class EmployerModuleController {

    constructor(private readonly employerService: EmployerModuleService){}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async createEmployer(@Body() createReferentDto: CreateEmployerDto){
        return this.employerService.createEmployer(createReferentDto);
    }

    @Get()
    async getAllEmployers(){
        return this.employerService.getAllEmployers();
    }

    @Get('festival/:idFestival')
    async getAllEmployersByIdFestival(@Param('idFestival', ParseIntPipe) idFestival: number){
        return this.employerService.getAllEmployersByIdFestival(idFestival);
    }

    @Get('position/:idPoste')
    async getAllEmployersByIdPoste(@Param('idPoste', ParseIntPipe) idPoste: number){
        return this.employerService.getAllEmployersByIdPoste(idPoste);
    }

    @Get(':idFestival/:idPoste')
    async getEmployerById(@Param('idFestival', ParseIntPipe) idFestival: number, @Param('idPoste', ParseIntPipe) idPoste: number){
        return this.employerService.getEmployerByIdFestivalIdPoste(idFestival, idPoste);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put(':idFestival/:idPoste')
    async updateEmployer(@Param('idFestival', ParseIntPipe) idFestival: number, @Param('idPoste', ParseIntPipe) idPoste: number, @Body() updateEmployerDto: UpdateEmployerDto){
        return this.employerService.updateEmployer(idFestival, idPoste, updateEmployerDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(':idFestival/:idPoste')
    async deleteEmployer(@Param('idFestival', ParseIntPipe) idFestival: number, @Param('idPoste', ParseIntPipe) idPoste: number){
        return this.employerService.deleteEmployer(idFestival, idPoste);
    }


}
