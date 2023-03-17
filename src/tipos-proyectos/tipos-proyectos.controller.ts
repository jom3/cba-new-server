import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { TiposProyectosService } from './tipos-proyectos.service';
import { CreateTiposProyectoDto } from './dto/create-tipos-proyecto.dto';
import { UpdateTiposProyectoDto } from './dto/update-tipos-proyecto.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetPersona } from 'src/common/decorators/get-persona/get-persona.decorator';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';

@Controller('tiposProyectos')
export class TiposProyectosController {
  constructor(private readonly tiposProyectosService: TiposProyectosService) {}

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Post('registrarTipo')
  create(@Body() createTiposProyectoDto: CreateTiposProyectoDto) {
    return this.tiposProyectosService.create(createTiposProyectoDto);
  }

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarTipos')
  findAll() {
    return this.tiposProyectosService.findAll();
  }

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarTipo/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiposProyectosService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Patch('modificarTipo/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTiposProyectoDto: UpdateTiposProyectoDto) {
    return this.tiposProyectosService.update(id, updateTiposProyectoDto);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('eliminarTipo/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiposProyectosService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('restaurarTipo/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiposProyectosService.restore(id);
  }
}
