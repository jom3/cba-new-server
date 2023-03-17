import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectosService } from 'src/proyectos/proyectos.service';
import { DataSource, Repository } from 'typeorm';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { Archivo } from './entities/archivo.entity';
import fs from 'fs';

@Injectable()
export class ArchivosService {

  constructor(
    @InjectRepository(Archivo)
    private readonly archivoRepository:Repository<Archivo>,
    private readonly dataSource: DataSource,
    private readonly proyectoService:ProyectosService
  ){}

  async create(createArchivoDto: CreateArchivoDto, file:Express.Multer.File) {
    try {
      const archivo = this.archivoRepository.create({
        archivo:file.filename,
        ...createArchivoDto
      });
      await this.archivoRepository.save(archivo);
      return {msg:'El archivo fue registrado con exito'};
    } catch (error) {
      this.showError(error)
    }
  }

  async findAll() {
    const archivos = await this.archivoRepository.find()
    return archivos;
  }

  async findOne(id: string) {
    const archivo = await this.archivoRepository.findOneBy({archivo_id:id});
    if(!archivo){
      throw new  NotFoundException('No existe el archivo');
    }
    return archivo;
  }

  async update(id: string, updateArchivoDto: UpdateArchivoDto, file:Express.Multer.File) {
    try {
      const {proyecto_id} = await this.findOne(id);
      const {estado} = await this.proyectoService.findOne(proyecto_id)
      if(estado==1){
        throw new BadRequestException('El archivo no puede ser modificado, no esta activo')
      }
      const archivo = await this.archivoRepository.preload({archivo_id:id, archivo:file?.filename,...updateArchivoDto})
      await this.archivoRepository.save(archivo)
      return {msg:`El archivo fue modificado con exito`};
    } catch (error) {
      this.showError(error)
    }
  }

  async remove(id: string) {
    const {proyecto_id, archivo} = await this.findOne(id);
    const {estado} = await this.proyectoService.findOne(proyecto_id)
    if(estado==1){
      throw new BadRequestException('El archivo no puede ser modificado, no esta activo')
    }
    if(!archivo){
      throw new NotFoundException('No existe el archivo')
    }
    console.log(archivo)
    // fs.unlink(`./static/archivos/${archivo}`,function(e){
    //   if(e) console.log(e)
    // })
    await this.archivoRepository.delete({archivo_id:id})
    return {msg:`El archivo fue eliminado con exito`};
  }

  private showError(error:any){
    console.log(error)
    throw new InternalServerErrorException(error)
  }
}
