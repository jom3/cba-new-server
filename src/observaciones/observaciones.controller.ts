import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ObservacionesService } from './observaciones.service';
import { CreateObservacionDto } from './dto/create-observacion.dto';
import { UpdateObservacionDto } from './dto/update-observacion.dto';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';
import { AuthGuard } from '@nestjs/passport';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';

@Controller('observaciones')
export class ObservacionesController {
  constructor(private readonly observacionesService: ObservacionesService) {}

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Post('registrarObservacion')
  create(@Body() createObservacionDto: CreateObservacionDto) {
    return this.observacionesService.create(createObservacionDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarObservaciones')
  findAll() {
    return this.observacionesService.findAll();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarObservacion/:id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.observacionesService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Patch('modificarObservacion/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateObservacionDto: UpdateObservacionDto) {
    return this.observacionesService.update(id, updateObservacionDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('eliminarObservacion/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.observacionesService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('bloquearObservacion/:id')
  block(@Param('id', ParseUUIDPipe) id: string) {
    return this.observacionesService.block(id);
  }
}
