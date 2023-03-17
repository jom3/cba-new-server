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
import { EgresosService } from './egresos.service';
import { CreateEgresoDto } from './dto/create-egreso.dto';
import { UpdateEgresoDto } from './dto/update-egreso.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';

@Controller('egresos')
export class EgresosController {
  constructor(private readonly egresosService: EgresosService) {}

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Post('registrarEgreso')
  create(@Body() createEgresoDto: CreateEgresoDto) {
    return this.egresosService.create(createEgresoDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarEgresos')
  findAll() {
    return this.egresosService.findAll();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarEgreso/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.egresosService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Patch('modificarEgreso/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEgresoDto: UpdateEgresoDto,
  ) {
    return this.egresosService.update(id, updateEgresoDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Delete('eliminarEgreso/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.egresosService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Delete('bloquearEgreso/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.egresosService.lock(id);
  }
}
