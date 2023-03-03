import { Module } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { InventariosController } from './inventarios.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Inventario } from './entities/inventario.entity';
import { ProductosService } from 'src/productos/productos.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Producto,Inventario]),
  ],
  controllers: [InventariosController],
  providers: [InventariosService, ProductosService]
})
export class InventariosModule {}
