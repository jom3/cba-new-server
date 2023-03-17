import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import { CreateMiembroDto } from './dto/create-miembro.dto';
import { UpdateMiembroDto } from './dto/update-miembro.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {}

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Post('registrarMiembro')
  create(@Body() createMiembroDto: CreateMiembroDto) {
    return this.miembrosService.create(createMiembroDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarMiembros')
  findAll() {
    return this.miembrosService.findAll();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarMiembro/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.miembrosService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Patch('modificarMiembro/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMiembroDto: UpdateMiembroDto) {
    return this.miembrosService.update(id, updateMiembroDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('eliminarMiembro/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.miembrosService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('restaurarMiembro/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.miembrosService.restore(id);
  }
}
