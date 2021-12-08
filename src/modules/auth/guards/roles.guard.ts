import { UserEntity } from './../../user/domain/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  //reflector use to access to route's role
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userData: UserEntity = request.user;
    const userRole = userData.roleId;

    if (!userData || !requiredRoles.includes(userRole)) {
      throw new HttpException('Permission denied!', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
