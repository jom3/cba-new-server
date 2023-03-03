import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from 'src/inventarios/entities/inventario.entity';
import { Producto } from './entities/producto.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Producto,Inventario,Proyecto])
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports:[ProductosService]
})
export class ProductosModule {}
