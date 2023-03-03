import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { Auth } from "../entities/auth.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

export class JwtStatregy extends PassportStrategy( Strategy){

    constructor(
        @InjectRepository(Auth)
        private readonly authRepository:Repository<Auth>,

        configService:ConfigService
    ){
        super({
            secretOrKey:configService.get('JWT_SECRET'),
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload:JwtPayload): Promise<Auth> {
        const {persona_id} = payload;

        const persona = await this.authRepository.findOneBy({persona_id});

        if(!persona){
            throw new UnauthorizedException('Token is not valid');
        }

        return persona;
    }

}