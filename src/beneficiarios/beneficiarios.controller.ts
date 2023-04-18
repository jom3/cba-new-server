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
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { ArchivoFilter, fileFilter, fileNamer } from 'src/common/helpers';
import { ComprimidoFilter } from 'src/common/helpers/comprimidoFilter.helper';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';
import { BeneficiariosService } from './beneficiarios.service';
import { CreateBeneficiarioDto } from './dto/create-beneficiario.dto';
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller('beneficiarios')
export class BeneficiariosController {
  constructor(private readonly beneficiariosService: BeneficiariosService) {}

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)

  @Post('registrarBeneficiario')
  @UseInterceptors(
    FileInterceptor('archivo', {
      fileFilter: ArchivoFilter,
      storage: diskStorage({
        destination: './static/archivos/postulaciones',
        filename: fileNamer,
      }),
    }),
  )
  create(
    @Body() createBeneficiarioDto: CreateBeneficiarioDto,
    @UploadedFile() file: Express.Multer.File,
    ) {
      console.log(file)
    return this.beneficiariosService.create(createBeneficiarioDto,file);
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

  @Get('obtenerArchivo/:id')
  async getFile(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const nombre = await this.beneficiariosService.obtenerNombre(id)
    console.log(nombre)
    const file = readFileSync(join(`${process.cwd()}/static/archivos/postulaciones/${nombre}`));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${nombre}"`,
    });
    return new StreamableFile(file);
  }
}
