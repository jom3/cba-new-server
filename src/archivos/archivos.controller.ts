import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseUUIDPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { ArchivoFilter, fileNamer } from 'src/common/helpers';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';
import { ArchivosService } from './archivos.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';

@Controller('archivos')
export class ArchivosController {
  constructor(private readonly archivosService: ArchivosService) {}

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Post('registrarArchivo')
  @UseInterceptors(
    FileInterceptor('archivo', {
      fileFilter: ArchivoFilter,
      storage: diskStorage({
        destination: './static/archivos',
        filename: fileNamer,
      }),
    }),
  )
  create(
    @Body() createArchivoDto: CreateArchivoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.archivosService.create(createArchivoDto, file);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarArchivos')
  findAll() {
    return this.archivosService.findAll();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Get('listarArchivo/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.archivosService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Patch('modificarArchivo/:id')
  @UseInterceptors(
    FileInterceptor('archivo', {
      fileFilter: ArchivoFilter,
      storage: diskStorage({
        destination: './static/archivos',
        filename: fileNamer,
      }),
    }),
  )
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArchivoDto: UpdateArchivoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.archivosService.update(id, updateArchivoDto, file);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'), PersonaRoleGuard)
  @Delete('eliminarArchivo/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.archivosService.remove(id);
  }
}
