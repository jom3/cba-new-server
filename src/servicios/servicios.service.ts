import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Detalle } from 'src/detalles/entities/detalle.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServiciosService {

  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository:Repository<Servicio>,
    @InjectRepository(Detalle)
    private readonly detalleRepository:Repository<Detalle>,
    private readonly dataSource:DataSource
  ){}

  async create(createServicioDto: CreateServicioDto) {
    try {
      const servicio = this.servicioRepository.create(createServicioDto);
      await this.servicioRepository.save(servicio);
      return {msg:'El servicio fue registrado con exito'};
    } catch (error) {
      this.showError(error)
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const {limit,offset} = paginationDto;
    const servicios = await this.servicioRepository.find({
      take:limit,
      skip:offset
    })
    return servicios;
  }

  async findOne(id: string) {
    const servicio = await this.servicioRepository.findOneBy({servicio_id:id});
    if(!servicio){
      throw new NotFoundException('No existe el servicio')
    }
    return servicio;
  }

  async update(id: string, updateServicioDto: UpdateServicioDto) {
    const {estado} = await this.findOne(id);
    try {
      const servicio = await this.servicioRepository.preload({servicio_id:id, ...updateServicioDto});
      if(!servicio){
        throw new NotFoundException('No existe el servicio')
      }
      if(estado!=1){
        throw new BadRequestException('El servicio esta dado de baja y no puede ser modificado')
      }
      await this.servicioRepository.save(servicio);
      return {msg:`El servicio fue modificado con exito`};
    } catch (error) {
      this.showError(error)
    }
  }

  async remove(id: string) {
    const {estado} = await this.findOne(id);
    if(estado!=1){
      throw new BadRequestException('El servicio no puede ser removido, este ya esta dado de baja')
    }
    await this.dataSource.createQueryBuilder()
    .update(Servicio)
    .set({estado:0})
    .where('servicio_id=:id',{id})
    .execute()
    return {msg:'El servicio fue dado de baja con exito'};
  }

  async restore(id: string) {
    const {estado} = await this.findOne(id);
    if(estado!=0){
      throw new BadRequestException('El servicio no puede ser restaurado, este ya esta dado de alta')
    }
    await this.dataSource.createQueryBuilder()
    .update(Servicio)
    .set({estado:1})
    .where('servicio_id=:id',{id})
    .execute()
    return {msg:'El servicio fue dado de alta con exito'};
  }

  private showError(error:any){
    throw new InternalServerErrorException(error)
  }
}
