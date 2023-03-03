import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TiposProyectosService } from './tipos-proyectos.service';
import { CreateTiposProyectoDto } from './dto/create-tipos-proyecto.dto';
import { UpdateTiposProyectoDto } from './dto/update-tipos-proyecto.dto';

@Controller('tiposProyectos')
export class TiposProyectosController {
  constructor(private readonly tiposProyectosService: TiposProyectosService) {}

  @Post('registrarTipo')
  create(@Body() createTiposProyectoDto: CreateTiposProyectoDto) {
    return this.tiposProyectosService.create(createTiposProyectoDto);
  }

  @Get('listarTipos')
  findAll() {
    return this.tiposProyectosService.findAll();
  }

  @Get('listarTipo/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiposProyectosService.findOne(id);
  }

  @Patch('modificarTipo/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTiposProyectoDto: UpdateTiposProyectoDto) {
    return this.tiposProyectosService.update(id, updateTiposProyectoDto);
  }

  @Delete('eliminarTipo/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiposProyectosService.remove(id);
  }

  @Delete('restaurarTipo/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiposProyectosService.restore(id);
  }
}
