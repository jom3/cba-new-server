import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from 'src/common/helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';
import { AuthGuard } from '@nestjs/passport';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Post('registrarPersona')
  @UseInterceptors(
    FileInterceptor('foto', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/perfiles',
        filename: fileNamer,
      }),
    }),
  )
  create(
    @Body() createPersonaDto: CreatePersonaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.personasService.create(createPersonaDto, file);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Patch('modificarPerfil/:id')
  @UseInterceptors(
    FileInterceptor('foto', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/perfiles',
        filename: fileNamer,
      }),
    }),
  )
  updatePerfil(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.personasService.updatePerfil(id, updatePersonaDto,file);
  }

  @Get('obtenerImagen/:foto')
  findImage(@Res() res: Response, @Param('foto') foto: string) {
    const path = this.personasService.getImage(foto);

    res.status(200).sendFile(path);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarPersonas')
  findAll() {
    return this.personasService.findAll();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarPersonal')
  findPersonal() {
    return this.personasService.findPersonal();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarUsuarios')
  findUsuarios() {
    return this.personasService.findUsuarios();
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal,ValidRoles.Usuario)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarPersona/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.personasService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Patch('modificarPersona/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ) {
    return this.personasService.update(id, updatePersonaDto);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('eliminarPersona/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.personasService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('restaurarPersona/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.personasService.restore(id);
  }
}
