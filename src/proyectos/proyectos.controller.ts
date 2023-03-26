import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Post('registrarProyecto')
  create(@Body() createProyectoDto: CreateProyectoDto) {
    console.log('controlador',createProyectoDto)
    return this.proyectosService.create(createProyectoDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarProyectos')
  findAll() {
    return this.proyectosService.findAll();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarProyectosPublicos')
  findAllPublicos() {
    return this.proyectosService.findAllPublicos();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarMisProyectos/:id')
  findAllMe(@Param('id') id: string) {
    return this.proyectosService.findAllMe(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarProyectos/:id')
  findAllByPersona(@Param('id') id: string) {
    return this.proyectosService.findAllByPersona(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarProyecto/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Patch('modificarProyecto/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectosService.update(id, updateProyectoDto);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('eliminarProyecto/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('restaurarProyecto/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.restore(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('planificarProyecto/:id')
  plan(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.plan(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('ejecutarProyecto/:id')
  eje(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.eje(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('bloquearProyecto/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.lock(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('aceptarProyecto/:id')
  accept(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.accept(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('rechazarProyecto/:id')
  deny(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.deny(id);
  }
}
