import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { Detalle } from './entities/detalle.entity';

@Injectable()
export class DetallesService {

  constructor(
    @InjectRepository(Detalle)
    private readonly detalleRepository:Repository<Detalle>,
    @InjectRepository(Servicio)
    private readonly servicioRepository:Repository<Servicio>,
    private readonly dataSource:DataSource
  ){}
  
  async create(createDetalleDto: CreateDetalleDto) {
    try {
      const {servicio_id, ...detalleData} = createDetalleDto;
      const servicio = await this.servicioRepository.findOneBy({servicio_id});
      if(!servicio){
        throw new NotFoundException('No existe un servicio con ese ID')
      }
      const detalle = this.detalleRepository.create({
        ...detalleData,
        servicio_id
      })
      await this.detalleRepository.save(detalle)
      return {msg:'Un detalle fue agregado al servicio'};
    } catch (error) {
      this.showError(error)
    }
  }

  async findAll(id:string) {
    const detalles = await this.detalleRepository.findBy({servicio_id:id})
    return detalles;
  }

  async findOne(id: string) {
    const detalle = await this.detalleRepository.findOneBy({detalle_id:id})
    if(!detalle){
      throw new NotFoundException('No existe el detalle')
    }
    return detalle;
  }

  async update(id: string, updateDetalleDto: UpdateDetalleDto) {
    const detalle = await this.detalleRepository.preload({
      detalle_id:id, ...updateDetalleDto
    })
    if(!detalle){
      throw new NotFoundException('No existe el detalle')
    }
    const {estado} = await this.findOne(id);
    if(estado!=1){
      throw new BadRequestException('El estado del detalle no le permite ser modificado');
    }
    await this.detalleRepository.save(detalle);
    return {msg:`El detalle fue modificado con exito`};
  }

  async remove(id: string) {
    const detalle = await this.findOne(id);
    if(detalle.estado==3){
      throw new BadRequestException('El detalle fue bloqueado y no puede ser modificado')
    }
    if(detalle.estado!= 1){
      throw new BadRequestException('El estado del detalle no puede ser modificado')
    }
    await this.dataSource.createQueryBuilder()
    .update(Detalle)
    .set({
      estado:0,
      eliminado_en:new Date()
    }).where('detalle_id=:id',{id})
    .execute()
    return {msg:`El detalle fue eliminado con exito`};
  }

  async restore(id: string) {
    const detalle = await this.findOne(id);
    if(detalle.estado==3){
      throw new BadRequestException('El detalle fue bloqueado y no puede ser modificado')
    }
    await this.dataSource.createQueryBuilder()
    .update(Detalle)
    .set({
      estado:1,
      restaurado_en:new Date()
    }).where('detalle_id=:id',{id})
    .execute()
    return {msg:`El detalle fue restaurado con exito`};
  }

  async lock(id: string) {
    const detalle = await this.findOne(id);

    if(detalle.estado!= 1){
      throw new BadRequestException('El estado del detalle no puede ser modificado')
    }
    await this.dataSource.createQueryBuilder()
    .update(Detalle)
    .set({
      estado:3,
      bloqueado_en:new Date()
    }).where('detalle_id=:id',{id})
    .execute()
    return {msg:`El detalle fue bloqueado con exito`};
  }

  private showError(error:any){
   throw new InternalServerErrorException(error)
  }
}
