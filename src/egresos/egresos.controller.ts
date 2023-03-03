import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EgresosService } from './egresos.service';
import { CreateEgresoDto } from './dto/create-egreso.dto';
import { UpdateEgresoDto } from './dto/update-egreso.dto';

@Controller('egresos')
export class EgresosController {
  constructor(private readonly egresosService: EgresosService) {}

  @Post('registrarEgreso')
  create(@Body() createEgresoDto: CreateEgresoDto) {
    return this.egresosService.create(createEgresoDto);
  }

  @Get('listarEgresos')
  findAll() {
    return this.egresosService.findAll();
  }

  @Get('listarEgreso/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.egresosService.findOne(id);
  }

  @Patch('modificarEgreso/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEgresoDto: UpdateEgresoDto) {
    return this.egresosService.update(id, updateEgresoDto);
  }

  @Delete('eliminarEgreso/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.egresosService.remove(id);
  }

  @Delete('bloquearEgreso/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.egresosService.lock(id);
  }
}
