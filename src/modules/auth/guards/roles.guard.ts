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

    // mang rong van qua dc cai check nay, them length vao cho an toan
    if (!requiredRoles.length) {
      return true;
    }

    // cho nay lay user tu request ra luon
    const request = context.switchToHttp().getRequest();
    // thich thi thay interface user o day
    const userData: UserEntity = request.user;
    const userRole = userData.role.name;

    if (!userData || !requiredRoles.includes(userRole)) {
      throw new HttpException('Permission denied!', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
