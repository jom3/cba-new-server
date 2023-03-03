import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  @Post('registrarInventario')
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventariosService.create(createInventarioDto);
  }

  @Get('listarInventarios/:producto_id')
  findAll(
    @Param('producto_id',ParseUUIDPipe) producto_id: string
    ) {
    return this.inventariosService.findAll(producto_id);
  }

  @Get('listarInventario/:id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.inventariosService.findOne(id);
  }

  @Patch('modificarInventario/:id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateInventarioDto: UpdateInventarioDto) {
    return this.inventariosService.update(id, updateInventarioDto);
  }

  @Delete('eliminarInventario/:id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.inventariosService.remove(id);
  }

  @Delete('bloquearInventario/:id')
  lock(@Param('id',ParseUUIDPipe) id: string) {
    return this.inventariosService.lock(id);
  }
}
