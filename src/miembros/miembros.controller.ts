import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import { CreateMiembroDto } from './dto/create-miembro.dto';
import { UpdateMiembroDto } from './dto/update-miembro.dto';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {}

  @Post('registrarMiembro')
  create(@Body() createMiembroDto: CreateMiembroDto) {
    return this.miembrosService.create(createMiembroDto);
  }

  @Get('listarMiembros')
  findAll() {
    return this.miembrosService.findAll();
  }

  @Get('listarMiembro/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.miembrosService.findOne(id);
  }

  @Patch('modificarMiembro/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMiembroDto: UpdateMiembroDto) {
    return this.miembrosService.update(id, updateMiembroDto);
  }

  @Delete('eliminarMiembro:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.miembrosService.remove(id);
  }

  @Delete('eliminarMiembro:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.miembrosService.restore(id);
  }
}
