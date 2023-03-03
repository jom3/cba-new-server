import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ArchivoFilter, fileNamer } from 'src/common/helpers';
import { ArchivosService } from './archivos.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';

@Controller('archivos')
export class ArchivosController {
  constructor(private readonly archivosService: ArchivosService) {}

  @Post('registrarArchivo')
  @UseInterceptors( FileInterceptor('archivo', {
    fileFilter: ArchivoFilter,
    storage: diskStorage({
      destination: './static/archivos',
      filename: fileNamer
    })
  }) )
  create(
    @Body() createArchivoDto: CreateArchivoDto,
    @UploadedFile() file: Express.Multer.File,
    ) {
    return this.archivosService.create(createArchivoDto, file);
  }

  @Get('listarArchivos')
  findAll() {
    return this.archivosService.findAll();
  }

  @Get('listarArchivo/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.archivosService.findOne(id);
  }

  @Patch('modificarArchivo/:id')
  @UseInterceptors( FileInterceptor('archivo', {
    fileFilter: ArchivoFilter,
    storage: diskStorage({
      destination: './static/archivos',
      filename: fileNamer
    })
  }) )
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateArchivoDto: UpdateArchivoDto,
    @UploadedFile() file: Express.Multer.File,
    ) {
    return this.archivosService.update(id, updateArchivoDto, file);
  }

  @Delete('eliminarArchivo/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.archivosService.remove(id);
  }
}
