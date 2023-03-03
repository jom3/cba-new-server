import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync } from 'fs';
import { join } from 'path';
import { Auth } from 'src/auth/entities/auth.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  encryptPassword,
  generatePassword,
  SendEmail,
} from 'src/common/helpers';
import { Contacto } from 'src/contactos/entities/contacto.entity';
import { DataSource, Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import { cwd } from 'process';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Contacto)
    private readonly contactoRepository: Repository<Contacto>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPersonaDto: CreatePersonaDto, file: Express.Multer.File) {
    const { email, telefono, direccion, contacto, foto, ...personDetails } =
      createPersonaDto;
    try {
      const persona = this.personaRepository.create({
        contacto: this.contactoRepository.create({
          email,
          telefono,
          direccion,
        }),
        foto: `${file ? file.filename : null}`,
        ...personDetails,
      });
      console.log(persona)
      await this.personaRepository.save(persona);
      console.log(persona)
      const genPass = generatePassword();
      const encriptedPassword = encryptPassword(genPass);

      const auth = this.authRepository.create({
        persona_id: persona.persona_id,
        email,
        password: encriptedPassword,
      });
      await this.authRepository.save(auth);

      await SendEmail(genPass, persona);

      return { msg: 'Persona registrada con exito' };
    } catch (error) {
      this.showError(error);
    }
  }

  getImage(imagenName: string) {
    const path = join(`${cwd()}/static/perfiles/${imagenName}`);
    if (!existsSync(path)) {
      throw new NotFoundException('No existe la imagen');
    }

    return path;
  }

  async findAll() {
    const personas = await this.personaRepository.find();
    return personas;
  }

  async findPersonal() {
      const personas = await this.personaRepository.findBy({rol:'Personal'})
      return personas;
  }

  async findUsuarios() {
    const personas = await this.personaRepository.findBy({rol:'Usuario'})
    return personas;
  }

  async findOne(id: string) {
    const persona = await this.personaRepository.findOneBy({ persona_id: id });
    if (!persona) {
      throw new NotFoundException('No existe la persona');
    }
    return persona;
  }

  async update(id: string, updatePersonaDto: UpdatePersonaDto) {
    const { direccion, email, telefono, contacto, ...toUpdate } =
      updatePersonaDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const persona = await this.personaRepository.preload({
        persona_id: id,
        ...toUpdate,
      });
      if (!persona) {
        throw new NotFoundException('No existe la persona');
      }
      await this.personaRepository.save(persona);

      await queryRunner.query(
        `UPDATE contacto SET direccion = $1, email = $2, telefono=$3 WHERE contacto_id=(select contacto_id from persona where persona_id=$4)`,
        [direccion, email, telefono, id],
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        msg: 'Persona modificada con exito',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.showError(error);
    }
  }

  async remove(id: string) {
    await this.dataSource
      .createQueryBuilder()
      .update(Persona)
      .set({
        estado: 0,
      })
      .where('persona_id=:id', { id })
      .execute();
    return `Persona eliminada`;
  }

  async restore(id: string) {
    await this.dataSource
      .createQueryBuilder()
      .update(Persona)
      .set({
        estado: 1,
      })
      .where('persona_id=:id', { id })
      .execute();
    return `persona restaurada`;
  }

  private showError(error: any) {
    console.log(error);
    if (error.code === '23505') {
      throw new BadRequestException({ error: error.detail, code: error.code });
    }
    if (error.code === '23502') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(error);
  }
}
