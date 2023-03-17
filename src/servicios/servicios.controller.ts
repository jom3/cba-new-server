import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';
import { AuthGuard } from '@nestjs/passport';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Post('registrarServicio')
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarServicios')
  findAll(
    @Query() paginationDto:PaginationDto
  ) {
    return this.serviciosService.findAll(paginationDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarServicio/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviciosService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Patch('modificarServicio/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateServicioDto: UpdateServicioDto) {
    return this.serviciosService.update(id, updateServicioDto);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('eliminarServicio/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviciosService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('restaurarServicio/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviciosService.restore(id);
  }
}
