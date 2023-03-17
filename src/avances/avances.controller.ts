import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';
import { AvancesService } from './avances.service';
import { CreateAvanceDto } from './dto/create-avance.dto';
import { UpdateAvanceDto } from './dto/update-avance.dto';

@Controller('avances')
export class AvancesController {
  constructor(private readonly avancesService: AvancesService) {}

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Post('registrarAvance')
  create(@Body() createAvanceDto: CreateAvanceDto) {
    return this.avancesService.create(createAvanceDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarAvance/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.avancesService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Delete('eliminarAvance/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.avancesService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Delete('bloquearAvance/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.avancesService.lock(id);
  }
}
