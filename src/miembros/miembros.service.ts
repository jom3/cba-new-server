import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateMiembroDto } from './dto/create-miembro.dto';
import { UpdateMiembroDto } from './dto/update-miembro.dto';
import { Miembro } from './entities/miembro.entity';

@Injectable()
export class MiembrosService {

  constructor(
    @InjectRepository(Miembro)
    private readonly miembroRepository:Repository<Miembro>,
    private readonly dataSource:DataSource
  ){}

  async create(createMiembroDto: CreateMiembroDto) {
    try {
      const miembro = this.miembroRepository.create(createMiembroDto);
      await this.miembroRepository.save(miembro);
      return 'El nuevo miembro fue agregado con exito al proyecto';
    } catch (error) {
      this.showError(error)
    }
  }

  async findAll() {
    const miembros = await this.miembroRepository.find()
    return miembros;
  }

  async findOne(id: string) {
    const miembro = await this.miembroRepository.findOneBy({miembro_id:id});
    if(!miembro){
      throw new NotFoundException('No existe el miembro');
    }
    return miembro;
  }

  async update(id: string, updateMiembroDto: UpdateMiembroDto) {
    try {
      const { estado } = await this.findOne(id);
      if(estado!=1){
        throw new BadRequestException('El miembro no puede ser modificado, esta inactivo')
      }
      const miembro = await this.miembroRepository.preload({miembro_id:id, ...updateMiembroDto});
      if(!miembro){
        throw new BadRequestException('No existe el miembro que se busca modificar')
      }
      await this.miembroRepository.save(miembro);
      return `El miembro fue modificado con exito`;
    } catch (error) {
      this.showError(error)
    }
  }

  async remove(id: string) {
    const { estado } = await this.findOne(id);
      if(estado!=1){
        throw new BadRequestException('El miembro no puede ser eliminado, ya fue eliminado anteriormente')
      }
      await this.dataSource.createQueryBuilder()
      .update(Miembro)
      .set({
        estado:0,
        eliminado_en:new Date()
      })
      .where('miembro_id=:id',{id})
      .execute()
    return `El miembro fue eliminado con exito`;
  }

  async restore(id: string) {
    const { estado } = await this.findOne(id);
      if(estado!=0){
        throw new BadRequestException('El miembro no puede ser restaurado, ya fue restaurado anteriormente')
      }
      await this.dataSource.createQueryBuilder()
      .update(Miembro)
      .set({
        estado:1,
        eliminado_en:null
      })
      .where('miembro_id=:id',{id})
      .execute()
    return `El miembro fue restaurado con exito`;
  }

  private showError(error:any){
    throw new InternalServerErrorException(error)
  } 
}
