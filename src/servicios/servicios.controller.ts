import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post('registrarServicio')
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @Get('listarServicios')
  findAll(
    @Query() paginationDto:PaginationDto
  ) {
    return this.serviciosService.findAll(paginationDto);
  }

  @Get('listarServicio/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviciosService.findOne(id);
  }

  @Patch('modificarServicio/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateServicioDto: UpdateServicioDto) {
    return this.serviciosService.update(id, updateServicioDto);
  }

  @Delete('eliminarServicio/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviciosService.remove(id);
  }

  @Delete('restaurarServicio/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviciosService.restore(id);
  }
}
