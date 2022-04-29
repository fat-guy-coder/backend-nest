import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

function matchRoles(roles, userroles) {
  console.log(roles, userroles);
  return true;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.body.user) {
      throw new HttpException(
        'Unauthorized,user is required',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = request.body.user;
    return matchRoles(roles, user);
  }
}
