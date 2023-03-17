import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/common/decorators/rol-protected/rol-protected.decorator';
import { PersonaRoleGuard } from 'src/common/guards/persona-role/persona-role.guard';
import { ValidRoles } from 'src/common/interfaces/valid-roles/valid-roles';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Post('registrarProducto')
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarProductos')
  findAll(
    @Query() paginatioDto:PaginationDto
  ) {
    return this.productosService.findAll(paginatioDto);
  }

  @RoleProtected(ValidRoles.Admin, ValidRoles.Personal)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Get('listarProducto/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.findOne(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Patch('modificarProducto/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('eliminarProducto/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }

  @RoleProtected(ValidRoles.Admin)
  @UseGuards(AuthGuard('jwt'),PersonaRoleGuard)
  @Delete('restaurarProducto/:id')
  restaurar(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.restore(id);
  }
}
