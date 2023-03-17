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
import { BeneficiariosService } from './beneficiarios.service';
import { CreateBeneficiarioDto } from './dto/create-beneficiario.dto';
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto';

@Controller('beneficiarios')
export class BeneficiariosController {
  constructor(private readonly beneficiariosService: BeneficiariosService) {}

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Post('registrarBeneficiario')
  create(@Body() createBeneficiarioDto: CreateBeneficiarioDto) {
    return this.beneficiariosService.create(createBeneficiarioDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarBeneficiarios')
  findAll() {
    return this.beneficiariosService.findAll();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarMisPostulaciones/:id')
  findAllMe(@Param('id', ParseUUIDPipe) id: string) {
    return this.beneficiariosService.findAllMe(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarBeneficiario/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.beneficiariosService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Delete('aceptarBeneficiario/:id')
  accept(@Param('id', ParseUUIDPipe) id: string) {
    return this.beneficiariosService.accept(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Delete('rechazarBeneficiario/:id')
  deny(@Param('id', ParseUUIDPipe) id: string) {
    return this.beneficiariosService.deny(id);
  }
}
