import { Controller, Delete, Get, Post, Put, Body, Param, ParseIntPipe, UseGuards, ForbiddenException, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AssociationModuleService } from './association-module.service';
import { CreateAssociationDto } from './dto/createAssociation';
import { UpdateAssociationDto } from './dto/updateAssociation';
import { Request } from 'express';

@Controller('association-module')
export class AssociationModuleController {

    constructor(private readonly associationModuleService: AssociationModuleService){}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    creataAssociation(@Req() request: Request, @Body() createAssociationDto: CreateAssociationDto) {
        //Check if user is allowed to create an association (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to create an association`);
        }

        return this.associationModuleService.createAssociation(createAssociationDto);
    }

    @Get()
    getAllAssociation() {
        return this.associationModuleService.getAllAssociation();
    }

    @Get(':id')
    getOneAssociation(@Param('id', ParseIntPipe) idAssociation: number) {
        return this.associationModuleService.getOneAssociation(idAssociation);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put(':id')
    updateAssociation(@Req() request: Request, @Param('id', ParseIntPipe) idAssociation: number, @Body() updateAssociationDto: UpdateAssociationDto) {
        //Check if user is allowed to update an association (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to update an association`);
        }

        return this.associationModuleService.updateAssociation(idAssociation, updateAssociationDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(':id')
    deleteAssociation(@Req() request: Request, @Param('id', ParseIntPipe) idAssociation: number) {
        //Check if user is allowed to update an association (=user is admin)
        const user = request.user;

        if(!user || user["Role"] !== "Admin") {
            throw new ForbiddenException(`You are not allowed to update an association`);
        }

        return this.associationModuleService.deleteAssociation(idAssociation);
    }
}
