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
import { InstitucionesService } from './instituciones.service';
import { CreateInstitucioneDto } from './dto/create-institucione.dto';
import { UpdateInstitucioneDto } from './dto/update-institucione.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';

@Controller('instituciones')
export class InstitucionesController {
  constructor(private readonly institucionesService: InstitucionesService) {}

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Post('registrarInstitucion')
  create(@Body() createInstitucioneDto: CreateInstitucioneDto) {
    return this.institucionesService.create(createInstitucioneDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarInstituciones')
  findAll() {
    return this.institucionesService.findAll();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarInstitucionesByFinanciador')
  findAllFinanciadores() {
    return this.institucionesService.findAllFinanciadores();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarInstitucion/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.institucionesService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Patch('modificarInstitucion/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInstitucioneDto: UpdateInstitucioneDto,
  ) {
    return this.institucionesService.update(id, updateInstitucioneDto);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Delete('eliminarInstitucion/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.institucionesService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Delete('restaurarInstitucion/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.institucionesService.restore(id);
  }
}
