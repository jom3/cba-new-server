import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Post('registrarProyecto')
  create(@Body() createProyectoDto: CreateProyectoDto) {
    console.log('controlador',createProyectoDto)
    return this.proyectosService.create(createProyectoDto);
  }

  @Get('listarProyectos')
  findAll() {
    return this.proyectosService.findAll();
  }
  @Get('listarProyectos/:id')
  findAllByPersona(@Param('id') id: string) {
    return this.proyectosService.findAllByPersona(id);
  }

  @Get('listarProyecto/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.findOne(id);
  }

  @Patch('modificarProyecto/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectosService.update(id, updateProyectoDto);
  }

  @Delete('eliminarProyecto/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.remove(id);
  }

  @Delete('restaurarProyecto/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.restore(id);
  }

  @Delete('bloquearProyecto/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.lock(id);
  }

  @Delete('aceptarProyecto/:id')
  accept(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.accept(id);
  }

  @Delete('rechazarProyecto/:id')
  deny(@Param('id', ParseUUIDPipe) id: string) {
    return this.proyectosService.deny(id);
  }
}
