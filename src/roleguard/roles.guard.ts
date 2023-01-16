import { Injectable, CanActivate, ExecutionContext, UseGuards ,Request, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { MESSAGE } from 'src/message';
// import { roles } from './../constant';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,  private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    let roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) 
      return false
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const payloadData = <any> this.jwtService.decode(jwt, { json: true });
    let userrole = payloadData.userData.role;
    if(roles.indexOf(userrole) > -1) {
        return true;
    } else {
      throw new UnauthorizedException();

    } 
  }
}

