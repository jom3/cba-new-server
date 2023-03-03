import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DetallesService } from './detalles.service';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';

@Controller('detalles')
export class DetallesController {
  constructor(private readonly detallesService: DetallesService) {}

  @Post('registrarDetalle')
  create(@Body() createDetalleDto: CreateDetalleDto) {
    return this.detallesService.create(createDetalleDto);
  }

  @Get('listarDetalles/:id')
  findAll(@Param('id', ParseUUIDPipe) id: string) {
    return this.detallesService.findAll(id);
  }

  @Get('listarDetalle/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.detallesService.findOne(id);
  }

  @Patch('modificarDetalle/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDetalleDto: UpdateDetalleDto) {
    return this.detallesService.update(id, updateDetalleDto);
  }

  @Delete('eliminarDetalle/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.detallesService.remove(id);
  }
  @Delete('restaurarDetalle/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.detallesService.restore(id);
  }
  @Delete('bloquearDetalle/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.detallesService.lock(id);
  }
}
