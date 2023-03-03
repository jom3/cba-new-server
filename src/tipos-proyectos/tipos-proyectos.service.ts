import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTiposProyectoDto } from './dto/create-tipos-proyecto.dto';
import { UpdateTiposProyectoDto } from './dto/update-tipos-proyecto.dto';
import { TiposProyecto } from './entities/tipos-proyecto.entity';

@Injectable()
export class TiposProyectosService {

  constructor(
    @InjectRepository(TiposProyecto)
    private readonly tiposRepository:Repository<TiposProyecto>,
    private readonly dataSource:DataSource
  ){}

  async create(createTiposProyectoDto: CreateTiposProyectoDto) {
    try {
      const tipo = this.tiposRepository.create(createTiposProyectoDto);
      await this.tiposRepository.save(tipo);
      return {msg:'El nuevo tipo de proyecto fue registrado con exito'};
    } catch (error) {
      this.showError(error)
    }
  }

  async findAll() {
    const tipos = await this.tiposRepository.find();
    return tipos;
  } 

  async findOne(id: string) {
    const tipo = await this.tiposRepository.findOneBy({tipo_id:id});
    if(!tipo){
      throw new NotFoundException('No existe el tipo de proyecto')
    }
    return tipo;
  }

  async update(id: string, updateTiposProyectoDto: UpdateTiposProyectoDto) {
    try {
      const { estado } = await this.findOne(id)
      if(estado!=1){
        throw new BadRequestException('El tipo no puede ser modificado, esta dado de baja');
      }
      const tipo = await this.tiposRepository.preload({tipo_id:id, ...updateTiposProyectoDto});
      if(!tipo){
      throw new NotFoundException('No existe el tipo de proyecto')
      }
      await this.tiposRepository.save(tipo);
      return {msg:`El tipo de proyecto fue modificado con exito`};
    } catch (error) {
      this.showError(error)
    }
  }

  async remove(id: string) {
    const { estado } = await this.findOne(id)
    if(estado!=1){
      throw new BadRequestException('El tipo ya esta eliminado');
    }
    await this.dataSource.createQueryBuilder()
    .update(TiposProyecto)
    .set({estado:0})
    .where('tipo_id=:id',{id})
    .execute()
    return {msg:`El tipo de proyecto fue removido con exito`};
  }

  async restore(id: string) {
    const { estado } = await this.findOne(id)
    if(estado!=0){
      throw new BadRequestException('El tipo ya esta restaurado');
    }
    await this.dataSource.createQueryBuilder()
    .update(TiposProyecto)
    .set({estado:1})
    .where('tipo_id=:id',{id})
    .execute()
    return {msg:`El tipo de proyecto fue restaurado con exito`};
  }

  private showError(error:any){
    throw new InternalServerErrorException(error)
  }
}
