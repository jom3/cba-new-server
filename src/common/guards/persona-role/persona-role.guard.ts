import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/common/decorators/rol-protected/rol-protected.decorator';

@Injectable()
export class PersonaRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const { persona } = user;
      if (validRoles.includes(persona.rol)) {
        return true;
      }

    throw new ForbiddenException(
      `User ${user.persona.nombre_completo} need a valid role: [${validRoles}]`,
    );

    return true;
  }
}
