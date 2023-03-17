import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { compareSync } from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RecoverDto } from './dto/recover.dto';
import { encryptPassword, generatePassword, RecoverPasswordEmail } from 'src/common/helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.authRepository.findOneBy({ email });
      if (!user) {
        throw new UnauthorizedException('No existe el usuario');
      }
      if (!compareSync(password, user.password)) {
        throw new UnauthorizedException('contraseña equivocada');
      }
      const token:string = this.getJwtToken({ persona_id: user.persona_id });
      return {
        token
      };
    } catch (error) {
      this.showError(error);
    }
  }
  async recover(recoverDto:RecoverDto){
    try {
      const {email} = recoverDto;
      const user = await this.authRepository.findOneBy({email});
      if(!user){
        throw new NotFoundException('No existe un usuario con ese correo');
      }
      const newPassword = generatePassword();
      const newEncryptedPassword = encryptPassword(newPassword);

      await this.dataSource.createQueryBuilder()
      .update(Auth)
      .set({password:newEncryptedPassword})
      .where('email=:email',{email})
      .execute();

      await RecoverPasswordEmail(newPassword,email);

      return {msg:'La nueva contraseña fue generada y enviada a su correo con exito'}
    } catch (error) {
      this.showError(error)
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async modificarPassword(id: string, updateAuthDto: UpdateAuthDto) {
    try {
      const { password } = updateAuthDto;
      const user = await this.authRepository.findOneBy({ persona_id: id });
      if (!user) {
        throw new NotFoundException('No existe el usuario');
      }
      await this.dataSource
        .createQueryBuilder()
        .update(Auth)
        .set({ password })
        .where('persona_id=:id', { id })
        .execute();
      return `Contraseña modificada`;
    } catch (error) {
      this.showError(error);
    }
  }

  private showError(error: any) {
    console.log(error);
  }
}
