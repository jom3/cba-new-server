import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { Ingreso } from './entities/ingreso.entity';

@Injectable()
export class IngresosService {
  
  constructor(
    @InjectRepository(Ingreso)
    private readonly ingresoRepository:Repository<Ingreso>,
    private readonly dataSource:DataSource
  ){}

  async create(createIngresoDto: CreateIngresoDto) {
    try {
      const {institucion_id,proyecto_id,...toCreate} = createIngresoDto;
      const ingreso = this.ingresoRepository.create({
        institucion:{institucion_id},
        proyecto:{proyecto_id},
        ...toCreate
      });
      await this.ingresoRepository.save(ingreso);
      return {msg:'El ingreso fue registrado con exito'};
    } catch (error) {
      this.showError(error)
    }
  }

  async findAll() {
    const ingresos = await this.ingresoRepository.find();
    return ingresos;
  }

  async findOne(id: string) {
    const ingreso = await this.ingresoRepository.findOneBy({ingreso_id:id});
    if(!ingreso){
      throw new NotFoundException('No existe el ingreso');
    }
    return ingreso;
  }

  async update(id: string, updateIngresoDto: UpdateIngresoDto) {
    try {
      const {estado} = await this.findOne(id)
      if(estado!=1){
        throw new BadRequestException('El ingreso no puede ser modificado, esta bloqueado');
      }
      const ingreso = await this.ingresoRepository.preload({ingreso_id:id, ...updateIngresoDto});
      if(!ingreso){
        throw new BadRequestException('No existe un ingreso con ese codigo');
      }
      await this.ingresoRepository.save(ingreso);
      return {msg:`El ingreso fue modificado con exito`};
    } catch (error) {
      this.showError(error)
    }
  }

  async remove(id: string) {
    const {estado} = await this.findOne(id)
      if(estado!=1){
        throw new BadRequestException('El ingreso no puede ser eliminado, esta bloqueado');
      }
      await this.ingresoRepository.delete({ingreso_id:id});
    return {msg:`El ingreso fue eliminado con exito`};
  }

  async lock(id: string) {
    const {estado} = await this.findOne(id)
      if(estado!=1){
        throw new BadRequestException('El ingreso no puede bloqueado por segunda vez');
      }
      await this.dataSource.createQueryBuilder()
      .update(Ingreso)
      .set({
        estado:2,
        bloqueado_en:new Date()
      })
      .where('ingreso_id=:id',{id})
      .execute()
    return {msg:`El ingreso fue bloqueado con exito`};
  }

  private showError(error:any){
    throw new InternalServerErrorException(error)
  }
}
