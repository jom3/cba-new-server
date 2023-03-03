import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from 'src/common/helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Post('registrarPersona')
  @UseInterceptors( FileInterceptor('foto', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/perfiles',
      filename: fileNamer
    })
  }) )
  create(
    @Body() createPersonaDto: CreatePersonaDto,
    @UploadedFile() file: Express.Multer.File,
    ) {
    return this.personasService.create(createPersonaDto, file);
  }

  @Get('obtenerImagen/:foto')
  findImage(
    @Res() res: Response,
    @Param('foto') foto:string
  ){
    const path = this.personasService.getImage(foto);

    res.status(200).sendFile(path)
  }

  @Get('listarPersonas')
  findAll() {
    return this.personasService.findAll();
  }

  @Get('listarPersonal')
  findPersonal() {
    return this.personasService.findPersonal();
  }

  @Get('listarUsuarios')
  findUsuarios() {
    return this.personasService.findUsuarios();
  }

  @Get('listarPersona/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.personasService.findOne(id);
  }

  @Patch('modificarPersona/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personasService.update(id, updatePersonaDto);
  }

  @Delete('eliminarPersona/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.personasService.remove(id);
  }

  @Delete('restaurarPersona/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.personasService.restore(id);
  }
}
