import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario } from './entities/inventario.entity';
import {validate as isUUID} from 'uuid';
import { ProductosService } from 'src/productos/productos.service';

@Injectable()
export class InventariosService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
    private readonly dataSource: DataSource,
    private readonly productoService:ProductosService
  ) {}
  
  async create(createInventarioDto: CreateInventarioDto) {
    try {
      const inventario = this.inventarioRepository.create(createInventarioDto);
      await this.inventarioRepository.save(inventario);
      return {msg:'El inventario fue creado con exito'};
    } catch (error) {
      this.showError(error)
    }
  }

  async findAll(id: string) {
    if(!isUUID(id)){
      throw new NotAcceptableException('No es un codigo valido')
    }
    const inventarios = await this.inventarioRepository.findBy({producto_id:id})
    if(!inventarios){
      throw new NotFoundException('El producto no tiene inventario')
    }
    return inventarios;
  }

  async findOne(id: string) {
    const inventario = await this.inventarioRepository.findOneBy({inventario_id:id});
    if(!inventario){
      throw new NotFoundException('No existe el inventario consultado');
    }
    console.log(inventario)
    return inventario;
  }

  async update(id: string, updateInventarioDto: UpdateInventarioDto) {
    console.log(updateInventarioDto)
    console.log('first')
    const inventarioData = await this.findOne(id);
    const ProductoEstado = await this.productoService.findOne(inventarioData.producto_id)
    try {
      if(inventarioData.estado!=1){
        throw new BadRequestException('El inventario no puede ser modificado, esta bloqueado')
      }
      if(ProductoEstado.estado!=1){
        throw new BadRequestException('El producto esta dado de baja y el inventario no puede ser modificado')
      }
      const inventario = await this.inventarioRepository.preload({inventario_id:id, ...updateInventarioDto});
      await this.inventarioRepository.save(inventario);
      return {msg:`El inventario fue modificado con exito`};
    } catch (error) {
      this.showError(error)
    }
  }

  async remove(id: string) {
    const {estado} = await this.findOne(id)
    if(estado!=1){
      throw new BadRequestException('El inventario no puede ser eliminado, esta bloqueado')
    }
    await this.inventarioRepository.delete({inventario_id:id});
    return {msg:`El inventario fue eliminado con exito`};
  }

  async lock(id: string) {
    const {estado} = await this.findOne(id)
    if(estado!=1){
      throw new BadRequestException(`El inventario no puede ser bloqueado${estado==3?', esta bloqueado':''}`)
    }
    await this.dataSource.createQueryBuilder()
    .update(Inventario)
    .set({
      estado:3,
      bloqueado_en:new Date()
    })
    .where('inventario_id=:id',{id})
    .execute()
    return {msg:'El inventario fue bloqueado con exito'};
  }

  private showError(error:any){
    throw new InternalServerErrorException(error)
  }
}
