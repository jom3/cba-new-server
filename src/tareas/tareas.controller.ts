import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Post('registrarTarea')
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareasService.create(createTareaDto);
  }

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarTareas')
  findAll() {
    return this.tareasService.findAll();
  }

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarMisTareas/:id')
  findAllMe(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.findAllMe(id);
  }

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarTarea/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Patch('modificarTarea/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareasService.update(id, updateTareaDto);
  }

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('eliminarTarea/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('restaurarTarea/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.restore(id);
  }

  @RoleProtected(ValidRoles.Admin,ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('bloquearTarea/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.lock(id);
  }
}
