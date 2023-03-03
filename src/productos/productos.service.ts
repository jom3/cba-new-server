import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly dataSource:DataSource
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const producto = this.productoRepository.create(createProductoDto);
      await this.productoRepository.save(producto);
      return {msg:'El producto fue registado con exito'};
    } catch (error) {
      this.showError(error);
    }
  }

  async findAll(paginatioDto: PaginationDto) {
    const { limit, offset } = paginatioDto;
    const productos = await this.productoRepository.find({
      take:limit,
      skip:offset
    });
    return productos;
  }

  async findOne(id: string) {
    const producto = await this.productoRepository.findOneBy({
      producto_id: id,
    });
    if (!producto) {
      throw new NotFoundException('No existe el producto');
    }
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const {estado} = await this.findOne(id);
    const producto = await this.productoRepository.preload({producto_id:id, ...updateProductoDto})
    if(!producto){
      throw new NotFoundException('No existe el producto')
    }
    if(estado!=1){
      throw new BadRequestException('El producto esta dado de baja, no puede ser modificado')
    }
    try {
      await this.productoRepository.save(producto);
      return {msg:'El producto fue modificado con exito'};
    } catch (error) {
      this.showError(error)
    }
  }

  async remove(id: string) {
    const {estado} = await this.findOne(id);
    if(estado!=1){
      throw new BadRequestException('El producto tiene que estar activo para ser eliminado')
    }
    await this.dataSource.createQueryBuilder()
    .update(Producto)
    .set({
      estado:0,
      eliminado_en: new Date()
    })
    .where('producto_id=:id',{id})
    .execute()
    return {msg:`El producto fue eliminado con exito`};
  }
  
  async restore(id: string) {
    const {estado} = await this.findOne(id);
    if(estado!=0){
      throw new BadRequestException('El producto tiene que estar inactivo para ser restaurado')
    }
    await this.dataSource.createQueryBuilder()
    .update(Producto)
    .set({
      estado:1,
      eliminado_en: null
    })
    .where('producto_id=:id',{id})
    .execute()
    return {msg:`El producto fue restaurado con exito`};
  }

  private showError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException('Ya existe un producto con ese nombre');
    }
    throw new InternalServerErrorException(error);
  }
}
