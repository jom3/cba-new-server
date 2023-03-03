import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';

@Controller('ingresos')
export class IngresosController {
  constructor(private readonly ingresosService: IngresosService) {}

  @Post('registrarIngreso')
  create(@Body() createIngresoDto: CreateIngresoDto) {
    return this.ingresosService.create(createIngresoDto);
  }

  @Get('listarIngresos')
  findAll() {
    return this.ingresosService.findAll();
  }

  @Get('listarIngreso/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ingresosService.findOne(id);
  }

  @Patch('modificarIngreso/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateIngresoDto: UpdateIngresoDto) {
    return this.ingresosService.update(id, updateIngresoDto);
  }

  @Delete('eliminarIngreso/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ingresosService.remove(id);
  }

  @Delete('bloquearIngreso/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.ingresosService.lock(id);
  }
}
