import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { InstitucionesService } from './instituciones.service';
import { CreateInstitucioneDto } from './dto/create-institucione.dto';
import { UpdateInstitucioneDto } from './dto/update-institucione.dto';

@Controller('instituciones')
export class InstitucionesController {
  constructor(private readonly institucionesService: InstitucionesService) {}

  @Post('registrarInstitucion')
  create(@Body() createInstitucioneDto: CreateInstitucioneDto) {
    return this.institucionesService.create(createInstitucioneDto);
  }

  @Get('listarInstituciones')
  findAll() {
    return this.institucionesService.findAll();
  }

  @Get('listarInstitucion/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.institucionesService.findOne(id);
  }

  @Patch('modificarInstitucion/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateInstitucioneDto: UpdateInstitucioneDto) {
    return this.institucionesService.update(id, updateInstitucioneDto);
  }

  @Delete('eliminarInstitucion/:id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.institucionesService.remove(id);
  }

  @Delete('restaurarInstitucion/:id')
  restore(@Param('id',ParseUUIDPipe) id: string) {
    return this.institucionesService.restore(id);
  }
}
